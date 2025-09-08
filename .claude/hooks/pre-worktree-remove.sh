#!/bin/bash
# .claude/hooks/pre-worktree-remove.sh
# Hook for safely removing worktrees with validation and cleanup

set -e  # Exit on any error

# Read JSON input
input=$(cat)
worktree_path=$(echo "$input" | jq -r '.worktree_path // empty')
feature_name=$(echo "$input" | jq -r '.feature_name // empty')
force_remove=$(echo "$input" | jq -r '.force // "false"')
backup_enabled=$(echo "$input" | jq -r '.backup // "true"')

echo "🗑️  Preparing to remove worktree: $worktree_path"

# Validate required parameters
if [ -z "$worktree_path" ]; then
    echo "❌ Error: Missing worktree_path parameter"
    exit 1
fi

# Check if worktree exists
if [ ! -d "$worktree_path" ]; then
    echo "❌ Error: Worktree path does not exist: $worktree_path"
    exit 1
fi

# Check if worktree is a git worktree
if [ ! -d "$worktree_path/.git" ]; then
    echo "❌ Error: Path is not a git worktree: $worktree_path"
    exit 1
fi

# Extract worktree name for better identification
worktree_name=$(basename "$worktree_path")
if [ -z "$feature_name" ]; then
    feature_name=$worktree_name
fi

echo "🔍 Validating worktree removal conditions..."

# Check for uncommitted changes
cd "$worktree_path"
if [ -n "$(git status --porcelain)" ]; then
    if [ "$force_remove" = "true" ]; then
        echo "⚠️  Warning: Worktree has uncommitted changes, but force removal enabled"
    else
        echo "❌ Error: Worktree has uncommitted changes. Commit or stash changes first."
        echo "💡 Use force=true to override"
        git status --porcelain
        exit 1
    fi
fi

# Check if worktree has active subagents
if [ -f ".claude/worktree-status.json" ]; then
    active_agent=$(jq -r '.agent // "none"' .claude/worktree-status.json)
    if [ "$active_agent" != "none" ] && [ "$active_agent" != "false" ]; then
        if [ "$force_remove" = "true" ]; then
            echo "⚠️  Warning: Worktree has active subagent, but force removal enabled"
        else
            echo "❌ Error: Worktree has active subagent. Stop subagent first."
            echo "💡 Use force=true to override"
            exit 1
        fi
    fi
fi

# Check for incomplete tasks
if [ -f ".claude/worktree-status.json" ]; then
    progress=$(jq -r '.development.progress // 0' .claude/worktree-status.json)
    if [ "$progress" -lt 100 ] && [ "$progress" -gt 0 ]; then
        if [ "$force_remove" = "true" ]; then
            echo "⚠️  Warning: Worktree has incomplete tasks ($progress% complete), but force removal enabled"
        else
            echo "❌ Error: Worktree has incomplete tasks ($progress% complete). Complete tasks first."
            echo "💡 Use force=true to override"
            exit 1
        fi
    fi
fi

# Check if branch is merged
branch_name=$(git branch --show-current)
if [ -n "$branch_name" ]; then
    # Check if branch is merged to main
    if git branch --merged main 2>/dev/null | grep -q "$branch_name"; then
        echo "✅ Branch '$branch_name' is merged to main"
    else
        if [ "$force_remove" = "true" ]; then
            echo "⚠️  Warning: Branch '$branch_name' is not merged, but force removal enabled"
        else
            echo "❌ Error: Branch '$branch_name' is not merged. Merge branch first."
            echo "💡 Use force=true to override"
            exit 1
        fi
    fi
fi

# Create backup if enabled
if [ "$backup_enabled" = "true" ]; then
    echo "💾 Creating backup of worktree..."
    
    backup_dir="../worktree-backups"
    backup_name="$(date +%Y%m%d_%H%M%S)_${feature_name}"
    backup_path="${backup_dir}/${backup_name}"
    
    mkdir -p "$backup_dir"
    
    # Create comprehensive backup
    cd ..
    tar -czf "${backup_path}.tar.gz" \
        --exclude="node_modules" \
        --exclude="dist" \
        --exclude="build" \
        --exclude=".git" \
        --exclude="*.log" \
        --exclude="*.tmp" \
        --exclude="*.cache" \
        "$worktree_name" 2>/dev/null || true
    
    # Create backup metadata
    cat > "${backup_path}.json" << EOF
{
  "backup_name": "$backup_name",
  "worktree_path": "$worktree_path",
  "feature_name": "$feature_name",
  "branch": "$branch_name",
  "backup_date": "$(date -Iseconds)",
  "backup_path": "${backup_path}.tar.gz",
  "size_bytes": $(stat -f%z "${backup_path}.tar.gz" 2>/dev/null || stat -c%s "${backup_path}.tar.gz" 2>/dev/null || echo "unknown"),
  "removal_reason": "worktree_cleanup",
  "status": "pending_removal"
}
EOF
    
    echo "✅ Backup created: ${backup_path}.tar.gz"
fi

# Generate removal report
report_file="/tmp/worktree-removal-report-$(date +%s).json"
cat > "$report_file" << EOF
{
  "worktree": {
    "path": "$worktree_path",
    "name": "$worktree_name",
    "feature": "$feature_name",
    "branch": "$branch_name"
  },
  "removal": {
    "date": "$(date -Iseconds)",
    "force": $force_remove,
    "backup_created": $backup_enabled,
    "validation_passed": true
  },
  "status": {
    "uncommitted_changes": $([ -n "$(git status --porcelain)" ] && echo "true" || echo "false"),
    "active_agent": $(if [ -f ".claude/worktree-status.json" ]; then jq -r '.agent // "none"' .claude/worktree-status.json; else echo "none"; fi),
    "progress_percent": $(if [ -f ".claude/worktree-status.json" ]; then jq -r '.development.progress // 0' .claude/worktree-status.json; else echo "0"; fi),
    "branch_merged": $(if [ -n "$branch_name" ] && git branch --merged main 2>/dev/null | grep -q "$branch_name"; then echo "true"; else echo "false"; fi)
  },
  "backup": {
    "enabled": $backup_enabled,
    "path": $(if [ "$backup_enabled" = "true" ]; then echo "\"${backup_path}.tar.gz\""; else echo "null"; fi),
    "metadata": $(if [ "$backup_enabled" = "true" ]; then echo "\"${backup_path}.json\""; else echo "null"; fi)
  }
}
EOF

echo "📋 Removal report generated: $report_file"

# Run worktree cleanup script if exists
if [ -f "$worktree_path/cleanup-worktree.sh" ]; then
    echo "🧹 Running worktree cleanup script..."
    cd "$worktree_path"
    ./cleanup-worktree.sh || echo "⚠️  Cleanup script failed, continuing with removal"
fi

# Stop any running processes in the worktree
echo "🛑 Stopping processes in worktree..."
if command -v lsof &> /dev/null; then
    # Find processes using files in the worktree
    processes=$(lsof +D "$worktree_path" 2>/dev/null | tail -n +2 | awk '{print $2}' | sort -u)
    if [ -n "$processes" ]; then
        echo "⚠️  Found processes using worktree files:"
        echo "$processes" | xargs -I {} ps -p {} -o pid,comm --no-headers
        if [ "$force_remove" = "true" ]; then
            echo "🛑 Force stopping processes..."
            echo "$processes" | xargs kill -9 2>/dev/null || true
        else
            echo "❌ Error: Processes are using worktree files. Stop processes first."
            echo "💡 Use force=true to override"
            exit 1
        fi
    fi
fi

# Return to original directory
cd - > /dev/null

# Output validation result
cat << EOF
✅ Worktree removal validation completed

📍 **Worktree**: $worktree_path
🌿 **Branch**: $branch_name
🚀 **Feature**: $feature_name
📅 **Validation**: $(date)

✅ **Validation Passed**:
- [x] Worktree exists and is accessible
- [x] Git worktree structure valid
- [x] Uncommitted changes handled
- [x] Active subagents handled
- [x] Task completion checked
- [x] Branch merge status verified
- [x] Processes in worktree checked
- [x] Backup created (if enabled)

📋 **Next Steps**:
- Worktree is ready for safe removal
- Use git worktree remove command to remove
- Backup available at: ${backup_path}.tar.gz
- Removal report saved to: $report_file

EOF

# Output JSON for further processing
cat << EOF
{
  "worktree_path": "$worktree_path",
  "feature_name": "$feature_name",
  "branch": "$branch_name",
  "validation_passed": true,
  "force_remove": $force_remove,
  "backup_enabled": $backup_enabled,
  "backup_path": $(if [ "$backup_enabled" = "true" ]; then echo "\"${backup_path}.tar.gz\""; else echo "null"; fi),
  "report_file": "$report_file",
  "ready_for_removal": true,
  "warnings": [],
  "recommendations": [
    "Run 'git worktree remove $worktree_path' to remove worktree",
    "Review backup before final removal",
    "Update any references to this worktree"
  ]
}
EOF
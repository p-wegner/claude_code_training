#!/bin/bash
# .claude/hooks/integration-complete.sh

set -e

# Read JSON input
input=$(cat)
orchestration_id=$(echo "$input" | jq -r '.orchestration_id // empty')
integration_result=$(echo "$input" | jq -r '.integration_result // empty')
success=$(echo "$input" | jq -r '.success // false')

echo "🔀 Integration complete: $orchestration_id (success: $success)"

cd ".claude/orchestration/$orchestration_id"

# Log integration completion
cat >> orchestration.log << EOF

Integration Completed: $(date)
Success: $success
Result: $integration_result
EOF

# Update metadata
metadata_file="metadata.json"
tmp_file=$(mktemp)
jq ".integration = {\"completed_at\": \"$(date -Iseconds)\", \"success\": $success, \"result\": \"$integration_result\"}" "$metadata_file" > "$tmp_file" && mv "$tmp_file" "$metadata_file"

if [ "$success" = "true" ]; then
    echo "🧹 Starting cleanup..."
    
    # Update status to cleanup phase
    jq '.status = "cleanup_in_progress"' "$metadata_file" > "$tmp_file" && mv "$tmp_file" "$metadata_file"
    
    # Trigger cleanup
    Task \
        --description "Clean up successful orchestration" \
        --prompt "Clean up all worktrees and temporary files for successful orchestration $orchestration_id. Remove worktrees, backup any important artifacts, and generate final cleanup report." \
        --subagent-type "cleanup-manager" \
        --orchestration-id "$orchestration_id"
        
    # Generate success report
    cat > "ORCHESTRATION_SUCCESS.md" << EOF
# Orchestration Success Report

**Orchestration ID:** $orchestration_id
**Completed:** $(date)
**Result:** $integration_result

## Summary
All parallel tasks completed successfully and results have been integrated.

## Files Modified
$(git diff --name-only HEAD~1 2>/dev/null || echo "Unable to determine modified files")

## Next Steps
- Review the integrated changes
- Run comprehensive tests
- Deploy to staging environment

## Orchestration Log
$(cat orchestration.log)
EOF
    
    # Final status update
    jq '.status = "completed_successfully"' "$metadata_file" > "$tmp_file" && mv "$tmp_file" "$metadata_file"
    
else
    echo "❌ Integration failed, preserving worktrees for debugging"
    
    # Update status to failed
    jq '.status = "integration_failed"' "$metadata_file" > "$tmp_file" && mv "$tmp_file" "$metadata_file"
    
    # Generate failure report
    cat > "ORCHESTRATION_FAILURE.md" << EOF
# Orchestration Failure Report

**Orchestration ID:** $orchestration_id
**Failed:** $(date)
**Result:** $integration_result

## Issues
Integration failed. Worktrees preserved for debugging.

## Debugging Steps
- Review individual instance results
- Check for merge conflicts
- Resolve integration issues
- Retry integration if needed

## Orchestration Log
$(cat orchestration.log)
EOF
fi

echo "🔀 Integration completion processed"

# Output JSON for orchestration tracking
cat << EOF
{
  "orchestration_id": "$orchestration_id",
  "status": "integration_complete",
  "success": $success,
  "result": "$integration_result",
  "workspace": ".claude/orchestration/$orchestration_id",
  "report_file": ".claude/orchestration/$orchestration_id/ORCHESTRATION_$([ "$success" = "true" ] && echo "SUCCESS" || echo "FAILURE").md"
}
EOF
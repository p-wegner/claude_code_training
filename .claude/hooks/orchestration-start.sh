#!/bin/bash
# .claude/hooks/orchestration-start.sh

set -e

# Read JSON input
input=$(cat)
user_request=$(echo "$input" | jq -r '.user_request // empty')
orchestration_id=$(echo "$input" | jq -r '.orchestration_id // empty')

echo "🎼 Starting orchestration: $orchestration_id"
echo "📝 User request: $user_request"

# Create orchestration workspace
mkdir -p ".claude/orchestration/$orchestration_id"

# Initialize orchestration log
cat > ".claude/orchestration/$orchestration_id/orchestration.log" << EOF
Orchestration Started: $(date)
Request: $user_request
ID: $orchestration_id
Status: Initializing
EOF

# Create orchestration metadata
cat > ".claude/orchestration/$orchestration_id/metadata.json" << EOF
{
  "orchestration_id": "$orchestration_id",
  "user_request": "$user_request",
  "start_time": "$(date -Iseconds)",
  "status": "initializing",
  "instances": [],
  "worktrees": [],
  "tasks": []
}
EOF

# Trigger task analysis
echo "🔍 Starting task analysis..."
Task \
    --description "Analyze user request for parallel execution" \
    --prompt "Analyze this user request and create a parallel execution plan: $user_request. Output the plan in JSON format with task breakdown, dependencies, and resource requirements." \
    --subagent-type "task-analyzer" \
    --orchestration-id "$orchestration_id"

echo "🎼 Orchestration initialization complete"
metadata_file=".claude/orchestration/$orchestration_id/metadata.json"
tmp_file=$(mktemp)

# Update metadata to show task analysis started
jq '.status = "task_analysis_in_progress"' "$metadata_file" > "$tmp_file" && mv "$tmp_file" "$metadata_file"

# Output JSON for orchestration tracking
cat << EOF
{
  "orchestration_id": "$orchestration_id",
  "status": "initialized",
  "user_request": "$user_request",
  "workspace": ".claude/orchestration/$orchestration_id",
  "log_file": ".claude/orchestration/$orchestration_id/orchestration.log",
  "next_step": "task_analysis"
}
EOF
#!/bin/bash
# .claude/hooks/instance-complete.sh

set -e

# Read JSON input
input=$(cat)
orchestration_id=$(echo "$input" | jq -r '.orchestration_id // empty')
instance_id=$(echo "$input" | jq -r '.instance_id // empty')
worktree_path=$(echo "$input" | jq -r '.worktree_path // empty')
result=$(echo "$input" | jq -r '.result // empty')
success=$(echo "$input" | jq -r '.success // false')

echo "✅ Instance completed: $instance_id (success: $success)"

# Update orchestration status
cd ".claude/orchestration/$orchestration_id"

# Log instance completion
cat >> orchestration.log << EOF

Instance Completed: $(date)
Instance ID: $instance_id
Worktree: $worktree_path
Success: $success
Result: $result
EOF

# Create instance completion marker
touch "instance-$instance_id-complete"

# Update metadata
metadata_file="metadata.json"
tmp_file=$(mktemp)

# Add instance to completed list
jq ".instances += [{\"id\": \"$instance_id\", \"worktree\": \"$worktree_path\", \"completed_at\": \"$(date -Iseconds)\", \"success\": $success, \"result\": \"$result\"}]" "$metadata_file" > "$tmp_file" && mv "$tmp_file" "$metadata_file"

# Check if all instances are complete
total_instances=$(jq '.tasks | length' orchestration-plan.json 2>/dev/null || echo "0")
completed_instances=$(find . -name "instance-*-complete" | wc -l)

echo "Progress: $completed_instances / $total_instances instances completed"

if [ "$completed_instances" -eq "$total_instances" ] && [ "$total_instances" -gt 0 ]; then
    echo "🎉 All instances completed, triggering integration..."
    
    # Update status
    jq '.status = "integration_started"' "$metadata_file" > "$tmp_file" && mv "$tmp_file" "$metadata_file"
    
    # Trigger result integration
    Task \
        --description "Integrate results from all instances" \
        --prompt "Integrate results from all completed instances in orchestration $orchestration_id. Check for conflicts, merge changes, run validation tests, and prepare final integrated result." \
        --subagent-type "result-integrator" \
        --orchestration-id "$orchestration_id"
else
    echo "⏳ Waiting for other instances to complete..."
    # Update status to show progress
    jq ".status = \"instances_completing_$completed_instances_of_$total_instances\"" "$metadata_file" > "$tmp_file" && mv "$tmp_file" "$metadata_file"
fi

echo "✅ Instance completion processed"

# Output JSON for orchestration tracking
cat << EOF
{
  "orchestration_id": "$orchestration_id",
  "instance_id": "$instance_id",
  "status": "completed",
  "success": $success,
  "result": "$result",
  "progress": "$completed_instances/$total_instances",
  "all_complete": $([ "$completed_instances" -eq "$total_instances" ] && [ "$total_instances" -gt 0 ] && echo "true" || echo "false")
}
EOF
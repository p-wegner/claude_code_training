# Command: /orchestra-status

## Detail level: $ARGUMENTS

Shows real-time status of all orchestrated parallel development activities.

## Usage:
/orchestra-status "summary"     # High-level overview
/orchestra-status "detailed"    # Detailed progress per task
/orchestra-status "resources"    # Resource utilization
/orchestra-status "issues"       # Problems and blockers

## Output:
🎼 **Parallel Development Orchestra Status**

**Active Instances:** 3
**Worktrees in Use:** 3
**Overall Progress:** 47% complete

**Instance Details:**
🔵 Instance 1 (User Auth): 75% complete
   - JWT tokens: ✅ Done
   - Login endpoints: ✅ Done  
   - Password reset: 🔄 In progress
   - Resource usage: 1.2GB RAM, 15% CPU

🔴 Instance 2 (Payment Bugs): 40% complete
   - Bug investigation: ✅ Done
   - Fix development: 🔄 In progress
   - Testing: ⏳ Pending
   - Resource usage: 800MB RAM, 8% CPU

🟢 Instance 3 (API Docs): 20% complete
   - Endpoint documentation: 🔄 In progress
   - Examples: ⏳ Pending
   - Integration guide: ⏳ Pending
   - Resource usage: 500MB RAM, 5% CPU

**System Resources:**
- Memory Available: 6.2GB / 16GB (61% used)
- CPU Usage: 28% across all instances
- Disk Space: 2.1GB used by worktrees

**Estimated Time Remaining:** 23 minutes
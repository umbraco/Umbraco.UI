#!/bin/bash
# Auto-format staged files before git commit.
# Works in worktrees where Husky isn't set up (no npm install).

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command')

if [[ "$COMMAND" =~ ^git\ commit ]]; then
  npm run format 2>&1 && git add -u
fi

exit 0

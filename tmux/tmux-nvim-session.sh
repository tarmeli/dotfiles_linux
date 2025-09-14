#!/bin/bash

# Set session name
SESSION_NAME="nvim"

# Base directories
NOTES_DIR="$HOME/Documents/notes/konecranes"

# List of project directories
PROJECTS=()

# Check if session already exists
if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
  echo "Session '$SESSION_NAME' already exists. Attaching..."
  tmux attach -t "$SESSION_NAME"
  exit 0
fi

# Create new session in detached mode with a "notes" window
tmux new-session -d -s "$SESSION_NAME" -n "notes"

# Set up the notes window
tmux send-keys -t "$SESSION_NAME:notes" "cd \"$NOTES_DIR\"" C-m
tmux send-keys -t "$SESSION_NAME:notes" "nvim" C-m

# Loop through projects and create windows
for PROJECT_NAME in "${PROJECTS[@]}"; do
  tmux new-window -t "$SESSION_NAME" -n "$PROJECT_NAME"
  tmux send-keys -t "$SESSION_NAME:$PROJECT_NAME" "cd \"$PROJECT_NAME\"" C-m
  tmux send-keys -t "$SESSION_NAME:$PROJECT_NAME" "nvim" C-m

  # Split window and resize
  tmux split-window -h -t "$SESSION_NAME:$PROJECT_NAME"
  tmux send-keys -t right "cd \"$PROJECT_NAME\"" C-m
  tmux resize-pane -R 250
done

# Attach to the session
tmux attach -t "$SESSION_NAME"

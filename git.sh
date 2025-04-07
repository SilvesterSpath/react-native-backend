#!/bin/bash

# Check if a commit message was provided
if [ $# -eq 0 ]; then
    echo "Error: No commit message provided."
    echo "Usage: $0 <commit message>"
    exit 1
fi

# Combine all arguments into a single commit message
commit_message="$*"

# Git operations
echo "Adding all changes..."
git add .

echo "Committing changes..."
git commit -m "$commit_message"

echo "Pushing to remote repository..."
git push -u origin main

echo "Git operations completed successfully."
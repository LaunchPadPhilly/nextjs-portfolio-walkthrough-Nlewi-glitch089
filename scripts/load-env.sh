#!/usr/bin/env bash
# Load variables from a local .env file into the environment for the current shell
# and exported to child processes (used before running `git push` to satisfy
# pre-push checks that expect EC2_HOST, etc.).

set -e
if [ ! -f .env ]; then
  echo ".env file not found. Copy .env.sample to .env and edit values first."
  exit 1
fi

# Export all variables defined in .env for child processes
set -a
. ./.env
set +a

echo "Loaded .env into environment. EC2_HOST=${EC2_HOST:-<not-set>}"

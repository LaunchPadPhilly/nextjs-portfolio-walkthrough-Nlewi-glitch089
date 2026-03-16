#!/usr/bin/env bash
# Helper: deploy-local -> remote via SSH (for manual runs)
# Usage: EC2_SSH_KEY=~/.ssh/deploy_key.pem EC2_HOST=host EC2_SSH_USER=ubuntu ./scripts/deploy-remote.sh

set -euo pipefail

if [ -z "${EC2_HOST:-}" ] || [ -z "${EC2_SSH_USER:-}" ]; then
  echo "Require EC2_HOST and EC2_SSH_USER environment variables"
  exit 2
fi

KEY_OPT=""
if [ -n "${EC2_SSH_KEY:-}" ]; then
  KEY_OPT="-i $EC2_SSH_KEY"
fi

REMOTE_DIR=${EC2_REMOTE_DIR:-/home/$EC2_SSH_USER/app}

echo "Syncing repo to $EC2_SSH_USER@$EC2_HOST:$REMOTE_DIR"
rsync -avz --delete -e "ssh $KEY_OPT -o StrictHostKeyChecking=no" ./ $EC2_SSH_USER@$EC2_HOST:$REMOTE_DIR

echo "Running remote build and restart"
ssh $KEY_OPT -o StrictHostKeyChecking=no $EC2_SSH_USER@$EC2_HOST "cd $REMOTE_DIR && npm ci --production && npm run build && pm2 restart all || sudo systemctl restart my-app.service || true"

echo "Done"

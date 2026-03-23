#!/usr/bin/env bash
# One-command manual deploy to EC2 over SSH.
#
# Required env:
#   EC2_HOST
# Optional env:
#   EC2_SSH_USER (default: ubuntu)
#   EC2_SSH_KEY  (path to key file)
#   EC2_REMOTE_DIR (default: /home/<user>/app)
#   DEPLOY_REPO  (default: local git remote origin URL)
#
# Example:
#   EC2_HOST=52.90.239.180 EC2_SSH_USER=ubuntu EC2_SSH_KEY=~/.ssh/HR.pem ./scripts/deploy-remote.sh

set -euo pipefail

if [ -z "${EC2_HOST:-}" ]; then
  echo "ERROR: EC2_HOST is required"
  exit 2
fi

EC2_SSH_USER="${EC2_SSH_USER:-ubuntu}"
EC2_REMOTE_DIR="${EC2_REMOTE_DIR:-/home/$EC2_SSH_USER/app}"

if [ -n "${DEPLOY_REPO:-}" ]; then
  REPO_URL="$DEPLOY_REPO"
else
  REPO_URL="$(git config --get remote.origin.url || true)"
fi

if [ -z "$REPO_URL" ]; then
  echo "ERROR: Could not determine repository URL. Set DEPLOY_REPO explicitly."
  exit 2
fi

SSH_OPTS=(-o StrictHostKeyChecking=accept-new -o ConnectTimeout=20)
if [ -n "${EC2_SSH_KEY:-}" ]; then
  if [ ! -f "$EC2_SSH_KEY" ]; then
    echo "ERROR: EC2_SSH_KEY file not found: $EC2_SSH_KEY"
    exit 2
  fi
  chmod 600 "$EC2_SSH_KEY" || true
  SSH_OPTS+=(-i "$EC2_SSH_KEY")
fi

echo "[deploy] host=$EC2_HOST user=$EC2_SSH_USER dir=$EC2_REMOTE_DIR"

ssh "${SSH_OPTS[@]}" "$EC2_SSH_USER@$EC2_HOST" \
  REMOTE_DIR="$EC2_REMOTE_DIR" REPO_URL="$REPO_URL" bash -s <<'ENDSSH'
set -euo pipefail

echo "[remote] start $(date -u +%Y-%m-%dT%H:%M:%SZ)"
mkdir -p "$REMOTE_DIR"
cd "$REMOTE_DIR"

if [ -d .git ]; then
  echo "[remote] syncing existing repository"
  git fetch --all --prune
  git reset --hard origin/main
else
  echo "[remote] initializing repository"
  git init
  if git remote get-url origin >/dev/null 2>&1; then
    git remote set-url origin "$REPO_URL"
  else
    git remote add origin "$REPO_URL"
  fi
  git fetch --depth=1 origin main
  git reset --hard FETCH_HEAD
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "[remote] npm not found; installing Node.js 20"
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

if ! command -v pm2 >/dev/null 2>&1; then
  echo "[remote] pm2 not found; installing globally"
  sudo npm install -g pm2
fi

node -v
npm -v

echo "[remote] installing dependencies"
npm ci --no-audit --no-fund
echo "[remote] building app"
npm run build

echo "[remote] restarting process"
pm2 restart portfolio 2>/dev/null || pm2 start npm --name "portfolio" -- start
pm2 save

echo "[remote] done $(date -u +%Y-%m-%dT%H:%M:%SZ)"
ENDSSH

echo "[deploy] finished"

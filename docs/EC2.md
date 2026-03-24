# EC2 Instance & Deployment

This document explains how the repository deploys to and tests an EC2 instance.

## What happens during deployment

The main CI workflow (`.github/workflows/ci.yml`) includes a `setup-ec2-docker` job that:

1. SSHes into your EC2 host
2. Installs Docker if not already present
3. Pulls the latest code from GitHub
4. Runs `docker compose up -d --build` to rebuild and restart the app

This job runs automatically on pushes to `main` after the build and test jobs pass.

## Instance setup checklist

Before enabling the EC2 deployment job, your instance should have:

- **Security group rules:** Inbound SSH (port 22) and HTTP (port 80) allowed
- **Git installed:** Required to clone/pull the repository
- **Public IP or DNS:** Needed for GitHub Actions to reach the instance

The workflow will auto-install Docker on first run if it's missing.

## Required GitHub secrets

Set these in your repo → Settings → Secrets and variables → Actions:

- `EC2_HOST` — your instance's public IP or DNS hostname
- `EC2_USER` — SSH username (e.g., `ubuntu` for Ubuntu AMIs)
- `EC2_KEY` — the private SSH key (PEM format) that has access to the instance
- `EC2_PROJECT_PATH` — (optional) where to deploy the app; defaults to `/home/ubuntu/app`

## Manual deployment script

For faster iteration without pushing code, use the local deploy script:

```bash
EC2_HOST=52.90.239.180 EC2_SSH_USER=ubuntu EC2_SSH_KEY=~/.ssh/HR.pem ./scripts/deploy-remote.sh
```

This is preferred when your EC2 IP changes frequently or you want to test deploys locally before committing.

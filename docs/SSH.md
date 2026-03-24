# SSH Deployment to EC2

This document explains how to deploy to an EC2 instance over SSH.

## Quick start (recommended)

Use the included deployment script from your local machine:

```bash
EC2_HOST=<your-instance-ip> EC2_SSH_USER=ubuntu EC2_SSH_KEY=~/.ssh/HR.pem ./scripts/deploy-remote.sh
```

The script will:
1. SSH into the instance
2. Clone or sync the latest code from GitHub
3. Auto-install Node.js, npm, and PM2 if missing
4. Run `npm ci && npm run build`
5. Restart the PM2 process named `portfolio`

## Automated CI deployment (optional)

Alternatively, the CI workflow (`.github/workflows/ci.yml`) includes a `setup-ec2-docker` job that automates deployment on `main` pushes. This requires the GitHub secrets listed below.

## Required setup

### SSH key and permissions

1. Generate a dedicated SSH key pair (or use an existing one):
   ```bash
   ssh-keygen -t rsa -b 4096 -f ~/.ssh/deploy_key -N ""
   ```

2. Add the public key to your EC2 instance:
   ```bash
   ssh-copy-id -i ~/.ssh/deploy_key.pub ubuntu@<instance-ip>
   ```

### Instance prerequisites

Your EC2 instance should have:
- Git installed (`git --version` works)
- Inbound SSH (port 22) allowed from your machine

The deploy script will auto-install Node.js, npm, and PM2 on first run.

### GitHub secrets (if using CI automation)

Set these in your repo → Settings → Secrets and variables → Actions:

- `EC2_HOST` — your instance's public IP or DNS hostname
- `EC2_USER` — SSH username (e.g., `ubuntu`)
- `EC2_KEY` — your private SSH key (PEM format)
- `EC2_PROJECT_PATH` — (optional) remote deployment directory; defaults to `/home/ubuntu/app`

## Troubleshooting

**SSH connection timeout:**
- Verify the EC2 instance is running and has a public IP
- Check that your security group allows inbound SSH (port 22)
- Confirm the instance's DNS/IP hasn't changed (IPs rotate when instances restart unless you use an Elastic IP)

**"npm: command not found" on remote:**
- The script auto-installs Node.js, but if it fails, manually SSH and run:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

**"pm2: command not found" on remote:**
- The script auto-installs PM2, but if needed:
  ```bash
  sudo npm install -g pm2
  ```

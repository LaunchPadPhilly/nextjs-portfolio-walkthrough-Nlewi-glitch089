# SSH Deployment from GitHub Actions

This document explains how to use the included GitHub Actions workflow to deploy to an EC2 instance over SSH.

What the workflow does

- Checks out the repository on the runner
- Adds your private SSH key and records the host fingerprint
- SSHes into the EC2 instance and runs `git pull` (or clones if missing), installs deps, builds, and restarts the app

Required repository secrets (set these in GitHub Settings → Secrets):

- `EC2_SSH_KEY` — the *private* SSH key with access to the deploy user (PEM/openssh format). Keep this secret.
- `EC2_HOST` — public hostname or IP of the instance (no protocol)
- `EC2_SSH_USER` — remote user (e.g., `ubuntu` or `ec2-user`)
- `EC2_REMOTE_DIR` (optional) — remote path for the app (defaults to `/home/$EC2_SSH_USER/app`)

Security notes

- Use a dedicated deploy key with limited access.
- Protect the `EC2_SSH_KEY` secret; rotate it if compromised.
- Consider using AWS SSM instead of SSH for stronger security and simpler key management.

Instance setup checklist

- Add the deploy user's public key (the counterpart to `EC2_SSH_KEY`) to `/home/<user>/.ssh/authorized_keys`.
- Ensure the instance allows inbound SSH (port 22) from GitHub Actions runners (or 0.0.0.0/0 if appropriate).
- Install Node, Git, and your process manager on the instance (e.g., `pm2`, or create a `systemd` service).
- Ensure the instance has access to the GitHub repo (public repo or a deploy key with repo access).

Run locally (example)

```bash
# Export variables and run the local helper script
export EC2_SSH_KEY="$HOME/.ssh/deploy_key.pem"
export EC2_HOST=ec2-3-12-34-56.compute-1.amazonaws.com
export EC2_SSH_USER=ubuntu
export EC2_REMOTE_DIR=/home/ubuntu/app

# Copy local repo to remote (example via rsync):
rsync -avz --delete -e "ssh -i $EC2_SSH_KEY -o StrictHostKeyChecking=no" ./ $EC2_SSH_USER@$EC2_HOST:$EC2_REMOTE_DIR

# Then SSH and build on remote
ssh -i $EC2_SSH_KEY $EC2_SSH_USER@$EC2_HOST "cd $EC2_REMOTE_DIR && npm ci --production && npm run build && pm2 restart all"
```

If you'd like, I can also add a small `scripts/deploy-remote.sh` helper to this repo for local use.

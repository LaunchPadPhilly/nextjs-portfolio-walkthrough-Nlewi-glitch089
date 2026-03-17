#!/usr/bin/env bash
# EC2 diagnostic script for the Portfolio app
# Usage:
# 1) copy to EC2: scp scripts/ec2-diagnose.sh ubuntu@EC2_HOST:~/
# 2) on EC2: chmod +x ec2-diagnose.sh && ./ec2-diagnose.sh /path/to/project

PROJECT_DIR="${1:-$(pwd)}"

sep(){ printf "\n=== %s ===\n" "$1"; }

sep "Basic host info"
date
uname -a
whoami
id
hostname -I 2>/dev/null || true
echo "Public IP (if reachable):"; curl -s --max-time 5 ifconfig.co || true

sep "Docker & compose versions"
docker --version || true
docker info --format '{{.ServerVersion}}' 2>/dev/null || true
docker compose version 2>/dev/null || docker-compose version 2>/dev/null || true

sep "Project directory"
echo "Requested project dir: $PROJECT_DIR"
cd "$PROJECT_DIR" 2>/dev/null || echo "Failed to cd $PROJECT_DIR (running from $(pwd))"
echo "Current git branch and commit:"; git rev-parse --abbrev-ref HEAD 2>/dev/null || true; git rev-parse --short HEAD 2>/dev/null || true

sep "Docker containers and ports"
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}' || true
docker compose ps --all || true

APP_CID=""
APP_CID=$(docker ps -qf "name=app" 2>/dev/null || true)
[ -z "$APP_CID" ] && APP_CID=$(docker ps -qf "name=portfolio_app" 2>/dev/null || true) || true
if [ -n "$APP_CID" ]; then
  sep "App container inspect (ports)"
  docker inspect --format '{{json .NetworkSettings.Ports}}' "$APP_CID" || true
fi

sep "Rebuild & start (docker compose up -d --build)"
docker compose pull || true
docker compose up -d --build || true

sep "Compose status and recent logs"
docker compose ps || true
docker compose logs --tail 200 app || docker logs --tail 200 "$APP_CID" || true

sep "Host networking / listening ports"
ss -ltnp 2>/dev/null | egrep ":80|:3000" || netstat -ltnp 2>/dev/null | egrep ":80|:3000" || true

sep "Local curl checks"
echo "curl localhost:3000 (headers)"; curl -I -m 5 http://localhost:3000 || true
echo "curl localhost:80 (headers)"; curl -I -m 5 http://localhost:80 || true

if [ -n "$APP_CID" ]; then
  sep "From inside app container: curl localhost:3000"
  docker exec -i "$APP_CID" curl -I -m 5 http://localhost:3000 || true
fi

sep "Firewall rules"
sudo ufw status || true
sudo iptables -L -n -v || true

sep "End of report"
echo "If port 3000 is listening only on 127.0.0.1, ensure the app binds to 0.0.0.0 (check your Next.js start command or server)."
echo "If docker reports port mapping other than 0.0.0.0:80->3000/tcp, check docker-compose.yml and restart compose."

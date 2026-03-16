# EC2 Instance Smoke Checks

This document explains how to run a simple smoke check against a deployed EC2 instance and how the repository's CI job can run the same check.

What the check does

- Sends an HTTP(S) GET to the root of your EC2 host and asserts a 2xx response.
- The local test is intentionally skipped unless `EC2_HOST` is set in the environment.

Running locally

1. Set the `EC2_HOST` environment variable to your instance's public DNS or IP.
   - Optionally set `EC2_PROTOCOL` to `https` if your site uses HTTPS.

Example (PowerShell):

```powershell
$env:EC2_HOST = "ec2-3-12-34-56.compute-1.amazonaws.com"
$env:EC2_PROTOCOL = "https" # optional
npm run test:ec2
```

Example (bash):

```bash
EC2_HOST=ec2-3-12-34-56.compute-1.amazonaws.com EC2_PROTOCOL=https npm run test:ec2
```

CI usage (GitHub Actions)

- Add a repository secret named `EC2_HOST` with the host value (no protocol).
- The included workflow `.github/workflows/ec2-check.yml` will use that secret to run the smoke check.

Security notes

- Do not commit private keys or credentials in the repository.
- Only store the EC2 host (DNS/IP) as a secret — do not store SSH keys in this workflow.

Troubleshooting

- If the test is skipped in CI, ensure `EC2_HOST` is set in the repository or environment for the workflow run.
- If fetch fails due to TLS, set `EC2_PROTOCOL` to `http` or ensure your instance serves a valid certificate.
- Allow inbound HTTP/HTTPS (ports 80/443) in your EC2 security group for the test to reach the service.

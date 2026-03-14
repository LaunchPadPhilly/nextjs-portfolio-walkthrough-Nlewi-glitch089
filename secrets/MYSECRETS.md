Keep the files in this directory local and out of version control.

- Purpose: store runtime secrets used by `docker-compose` (database URL, DB
  credentials, etc.).
- Git: `secrets/` is listed in `.gitignore` — do not add these files to commits.
- Creation: create each secret as a plain text file, e.g.:

  - `database_url.txt`: postgresql://user:password@db:5432/dbname
  - `postgres_user.txt`: username
  - `postgres_password.txt`: strongpassword
  - `postgres_db.txt`: dbname

- Permissions: keep files readable only by your user when possible.
- Sharing: use a secure channel (password manager/team vault) if you must share
  secrets with teammates — do not push them to GitHub.

Example (create locally):

  echo "postgresql://postgres:postgres@db:5432/appdb" > secrets/database_url.txt

#!/usr/bin/env bash
# Deploy the latest origin/main on naglasci.unipu.hr.
# Run by the self-hosted GitHub Actions runner (.github/workflows/deploy.yml),
# or by hand on the server:  bash ~/HNM-deploy/scripts/deploy.sh
set -euo pipefail

APP_DIR="${APP_DIR:-$HOME/HNM-deploy}"
BACKUP_DIR="${BACKUP_DIR:-$HOME/backups}"
export XDG_RUNTIME_DIR="${XDG_RUNTIME_DIR:-/run/user/$(id -u)}"

cd "$APP_DIR"

OLD=$(git rev-parse HEAD)
git fetch --quiet origin main
git reset --hard origin/main   # .env files are git-ignored and untouched
NEW=$(git rev-parse HEAD)
echo "Deploying $OLD -> $NEW"

changed() { [ "$OLD" != "$NEW" ] && ! git diff --quiet "$OLD" "$NEW" -- "$@"; }

# Backend dependencies
if changed backend/package.json backend/package-lock.json || [ ! -d backend/node_modules ]; then
  (cd backend && npm ci --omit=dev)
fi

# Re-seed quizzes only when the seed files changed (seeds replace quiz questions,
# user results are left alone). Back up the DB first.
if changed backend/seeds backend/quiz_models.js; then
  mkdir -p "$BACKUP_DIR"
  MONGO_URI=$(grep '^MONGO_URI=' backend/.env | cut -d= -f2-)
  mongodump --quiet --uri="$MONGO_URI" --gzip \
    --archive="$BACKUP_DIR/naglasci-$(date +%F-%H%M%S)-${OLD:0:7}.archive.gz"
  ls -1t "$BACKUP_DIR"/naglasci-*.archive.gz | tail -n +21 | xargs -r rm --
  (cd backend && npm run seed)
fi

# Frontend: install + production build
if changed frontend/package.json frontend/package-lock.json || [ ! -d frontend/node_modules ]; then
  (cd frontend && npm ci)
fi
(cd frontend && npm run build)

systemctl --user restart naglasci-backend naglasci-frontend

# Health check
for i in $(seq 1 30); do
  if curl -fsS -o /dev/null http://127.0.0.1:3000/ && curl -fsS -o /dev/null http://127.0.0.1:5000/; then
    echo "Deployed $NEW"
    exit 0
  fi
  sleep 2
done
echo "Health check failed" >&2
systemctl --user status naglasci-backend naglasci-frontend --no-pager -n 20 >&2 || true
exit 1

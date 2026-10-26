# HNM — Naglasci (HNM-deploy)

Web app for learning Croatian accent systems (naglasci). Next.js frontend + Express/MongoDB backend.

## 🌐 Live address

**http://naglasci.unipu.hr/**

## Deployment

Every push to `main` is deployed automatically by `.github/workflows/deploy.yml`, which runs on a
self-hosted GitHub Actions runner on the server (`naglasci`) and executes `scripts/deploy.sh`:

1. `git reset --hard origin/main` in `~/HNM-deploy` (`.env` files are git-ignored and kept)
2. `npm ci` when a `package*.json` changed
3. if `backend/seeds/` changed: `mongodump` backup to `~/backups/`, then `npm run seed`
4. `next build`, restart services, health check

On the server, the app runs as user systemd services (nginx :80 → Next.js :3000, which proxies `/api` → Express :5000):

```bash
systemctl --user status naglasci-backend naglasci-frontend github-runner
journalctl --user -u naglasci-frontend -f
bash ~/HNM-deploy/scripts/deploy.sh      # manual deploy
```

A deploy can also be triggered from the Actions tab (*Run workflow*).

## Structure

```
HNM2/
├── frontend/   # Next.js 16 + React 19 (app router)
├── backend/    # Express 5 + Mongoose (MongoDB)
└── Makefile    # install / run orchestration
```

## Requirements

- Node.js 20+ and npm
- MongoDB running locally (`mongodb://127.0.0.1:27017`)
- `make`

## Setup & run

```bash
# 1. install dependencies (frontend + backend)
make install

# 2. configure environment (copy the examples, then edit)
cp backend/.env.example backend/.env          # set MONGO_URI + JWT_SECRET
cp frontend/.env.example frontend/.env.local   # set NEXT_PUBLIC_API_URL

# 3. seed the database (loads kviz1..kviz5)
make seed

# 4. run everything (frontend :3000 + backend :5000)
make run
```

Run targets separately with `make frontend` / `make backend`. See all targets with `make help`.

## Environment variables

| File | Variable | Purpose |
|------|----------|---------|
| `backend/.env` | `MONGO_URI` | MongoDB connection string |
| `backend/.env` | `JWT_SECRET` | secret for signing auth tokens |
| `backend/.env` | `PORT` | API port (default `5000`) |
| `frontend/.env.local` | `NEXT_PUBLIC_API_URL` | base URL of the backend API (e.g. `http://16.192.20.160:5000`) |

> `.env` / `.env.local` hold secrets and are git-ignored — only the `.env.example` templates are committed.

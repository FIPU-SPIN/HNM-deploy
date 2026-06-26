# HNM — Naglasci (HNM-deploy)

Web app for learning Croatian accent systems (naglasci). Next.js frontend + Express/MongoDB backend.

## 🌐 Live address

**http://16.192.20.160:3000/**

> Use `http://` (not `https://`) — the dev server serves plain HTTP. The backend API runs on port `5000` at the same host.

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

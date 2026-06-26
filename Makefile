# ─────────────────────────────────────────────────────────────────────────────
#  HNM (Naglasci) — workspace Makefile
#  Orchestrates the Next.js frontend (./frontend) and the Express + MongoDB
#  backend (./backend). Run from the HNM2 directory:  make help
# ─────────────────────────────────────────────────────────────────────────────
SHELL := /bin/bash

# Project directories (override on the command line if you move things)
BACKEND_DIR  ?= backend
FRONTEND_DIR ?= frontend

.DEFAULT_GOAL := help

# ── Help ─────────────────────────────────────────────────────────────────────
.PHONY: help
help: ## Show this help
	@echo "HNM workspace — available targets:"
	@echo ""
	@grep -hE '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN{FS=":.*?## "}{printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Quick start:  make install   then   make run"

# ── Install ──────────────────────────────────────────────────────────────────
.PHONY: install install-backend install-frontend
install: install-backend install-frontend ## Install ALL dependencies (backend + frontend)
	@echo "✅ All dependencies installed."

install-backend: ## Install backend (npm) dependencies
	@echo "📦 Installing backend dependencies..."
	cd $(BACKEND_DIR) && npm install
	@test -f $(BACKEND_DIR)/.env || (echo "⚠️  $(BACKEND_DIR)/.env missing — copying from .env.example"; cp $(BACKEND_DIR)/.env.example $(BACKEND_DIR)/.env)

install-frontend: ## Install frontend (npm) dependencies
	@echo "📦 Installing frontend dependencies..."
	cd $(FRONTEND_DIR) && npm install
	@test -f $(FRONTEND_DIR)/.env.local || (echo "⚠️  $(FRONTEND_DIR)/.env.local missing — copying from .env.example"; cp $(FRONTEND_DIR)/.env.example $(FRONTEND_DIR)/.env.local)

# ── MongoDB ──────────────────────────────────────────────────────────────────
.PHONY: mongo mongo-status
mongo: ## Ensure local MongoDB is running (systemd service)
	@systemctl is-active --quiet mongod && echo "✅ mongod is running" || \
		(echo "▶️  starting mongod..."; sudo systemctl start mongod && sleep 2 && echo "✅ mongod started")

mongo-status: ## Show MongoDB service status
	@systemctl status mongod --no-pager -n 5 || true

# ── Database seeding ─────────────────────────────────────────────────────────
.PHONY: seed
seed: mongo ## Seed the database (loads kviz1..kviz5)
	@echo "🌱 Seeding database..."
	cd $(BACKEND_DIR) && npm run seed

# ── Run: backend ─────────────────────────────────────────────────────────────
.PHONY: backend run-backend dev-backend
backend: run-backend ## Alias for run-backend
run-backend: mongo ## Run backend only (Express API on :5000)
	@echo "🚀 Backend on http://localhost:5000"
	cd $(BACKEND_DIR) && npm start

dev-backend: mongo ## Run backend with auto-reload (nodemon)
	cd $(BACKEND_DIR) && npm run dev

# ── Run: frontend ────────────────────────────────────────────────────────────
.PHONY: frontend run-frontend build start-frontend
frontend: run-frontend ## Alias for run-frontend
run-frontend: ## Run frontend only (Next.js dev server on :3000)
	@echo "🚀 Frontend on http://localhost:3000"
	cd $(FRONTEND_DIR) && npm run dev

build: ## Build the frontend for production (next build)
	cd $(FRONTEND_DIR) && npm run build

start-frontend: ## Start the production frontend (after build)
	cd $(FRONTEND_DIR) && npm start

# ── Run: both together ───────────────────────────────────────────────────────
.PHONY: run dev up
run: dev ## Run backend + frontend together (Ctrl-C stops both)
dev up: mongo ## Run backend + frontend together (dev mode)
	@echo "🚀 Starting backend (:5000) + frontend (:3000) — Ctrl-C stops both"
	@trap 'kill 0' EXIT INT TERM; \
		( cd $(BACKEND_DIR)  && npm start     ) & \
		( cd $(FRONTEND_DIR) && npm run dev    ) & \
		wait

# ── Housekeeping ─────────────────────────────────────────────────────────────
.PHONY: clean
clean: ## Remove installed deps and Next.js build output
	rm -rf $(BACKEND_DIR)/node_modules
	rm -rf $(FRONTEND_DIR)/node_modules $(FRONTEND_DIR)/.next
	@echo "🧹 Cleaned node_modules and .next"

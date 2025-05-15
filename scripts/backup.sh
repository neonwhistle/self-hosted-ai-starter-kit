#!/usr/bin/env bash
set -euo pipefail
TS=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_DIR=/backups/$TS
mkdir -p "$BACKUP_DIR"

echo "→ Dumping Postgres..."
docker compose exec -T postgres pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > "$BACKUP_DIR/db.sql"

echo "→ Copying n8n data..."
docker compose cp n8n:/home/node/.n8n "$BACKUP_DIR/n8n_data"

echo "✓ Backup complete: $BACKUP_DIR" 
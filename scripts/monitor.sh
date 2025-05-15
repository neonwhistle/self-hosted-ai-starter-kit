#!/usr/bin/env bash
SERVICES=(postgres n8n redis postgrest caddy)
for svc in "${SERVICES[@]}"; do
  if ! docker compose exec -T "$svc" true 2>/dev/null; then
    echo "✗ $svc is not responding" | tee -a /var/log/nw-monitor.log
  fi
done 
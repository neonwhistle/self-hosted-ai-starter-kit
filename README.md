# Neonwhistle Automation & AI – Lean MVP Stack

A five-container setup that delivers:

| Service         | Purpose                                 | URL (example)                  |
|-----------------|-----------------------------------------|-------------------------------|
| **Caddy 2**     | TLS & reverse proxy                     | *edge*                        |
| **n8n 1.44**    | No-code automations & queue mode        | `https://automation.neonwhistle.com` |
| **Postgres 15 + pgvector** | Relational + vector DB         | internal only                  |
| **PostgREST**   | Supabase-style REST & GraphQL over Postgres | `https://api.neonwhistle.com` |
| **Redis 7**     | Queue + cache for n8n                   | internal only                  |

## Quick start
```bash
# clone and copy .env from template
cp .env.example .env
# tweak secrets …

# build and run
docker compose pull
docker compose up -d

# first-time: import pgvector extension just in case
# (container will do this automatically via init script)

# import existing n8n assets
docker compose run --rm n8n n8n import:credentials --separate --input=/files/credentials.json
docker compose run --rm n8n n8n import:workflow --input=/files/workflows.json --active=true
```

## Architecture
```
┌─────────────────────────────┐
│         HTTPS               │
├─────────────┬───────────────┤
│  Front-end  │               │
├─────────────┴───────────────┤
│   Caddy 2 (TLS / routing)   │
└─────────────────────────────┘
        │           │
        ▼           ▼
   n8n (5678)   PostgREST (3000)       Static site
        │           │
   Redis (cache/queue)      Postgres + pgvector (5432)
```

## Upgrading later
- >5M vectors → bolt on Qdrant.
- Offline embeddings → add transformer container.
- Spreadsheet UI → add Baserow; it re-uses the same Postgres.

---

## License
Apache 2.0

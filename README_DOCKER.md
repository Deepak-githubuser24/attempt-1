# 🚀 One-Click Docker Deployment for HAI

The fastest way to spin up the full HAI (Healthcare Anytime Anywhere) application is via Docker. No local Node.js setup required.

## Prerequisites
- Docker Desktop (Windows/Mac) or docker + docker-compose (Linux)

## Start the app (one command)
```bash
docker compose up --build -d
```
This builds the image (first time) and launches the container in the background.

Once you see `hai-app  | HAI backend listening on port 4000` in `docker compose logs`, the UI + API are ready at:

```
http://localhost:4000
```

## Demo credentials
* Email: `demo@hai.com`
* Password: `test123`

## Stopping the app
```bash
docker compose down
```

---
The container exposes port **4000** only; both the REST API and the static front-end are served from that single endpoint for a truly one-click experience.
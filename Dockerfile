# ---- Base Image ----
FROM node:18-alpine AS base
WORKDIR /app

# ---- Copy source ----
COPY server ./server
COPY hai_health_app ./hai_health_app

# ---- Install dependencies ----
WORKDIR /app/server
RUN npm install --production

# ---- Expose & run ----
EXPOSE 4000
CMD ["node", "index.js"]
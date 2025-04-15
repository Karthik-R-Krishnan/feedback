# Backend container
FROM node:18 as builder

WORKDIR /app

# Copy backend and frontend
COPY backend backend
COPY frontend frontend

# Build frontend
WORKDIR /app/frontend
RUN npm install && npm run build

# Install backend deps
WORKDIR /app/backend
RUN npm install

# Serve frontend from backend
RUN mkdir -p /app/backend/public
RUN cp -r /app/frontend/build/* /app/backend/public/

EXPOSE 3000

CMD ["node", "index.js"]

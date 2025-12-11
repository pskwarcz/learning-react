# Dockerfile (dev)
FROM node:24-alpine

# Set working folder
WORKDIR /app

# Install deps separately for better layer caching
COPY package-lock.json package.json ./
# If you use pnpm/yarn, copy their lockfiles instead and adjust the install command
RUN npm ci --no-audit --no-fund

# For dev we don't copy source here — we'll mount it at runtime
# Make sure the dev server binds to all interfaces
# Improve file watching inside Docker on macOS/Windows
ENV HOST=0.0.0.0 \
    CHOKIDAR_USEPOLLING=true \
    WATCHPACK_POLLING=true

# React/Next dev servers typically use 3000
EXPOSE 3000

# Optional: run as non-root
RUN addgroup -S app && adduser -S app -G app \
  && chown -R app:app /app
USER app

# Default command (may be overridden in compose)
CMD ["npm", "start"]

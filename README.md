tic-tac-toe project is a part of React learning course: https://react.dev/learn/tutorial-tic-tac-toe

### Development in Docker (React app)

#### Prerequisites

- Docker Desktop (includes Docker Compose)
- Internet access to pull base images

#### Quick start

1) From the project root (where `compose.yaml` is):
   ```bash
   docker compose up --build
   ```
2) Open the app in your browser: http://localhost:3000
3) Edit files on your host; the dev server in the container will hot‑reload.

#### What this does

- Builds a Node image (see `Dockerfile`) and runs a dev server in a container.
- Mounts your source code into `/app` for live editing.
- Keeps `node_modules` inside the container via a named volume.

#### Common commands

- Start (foreground with logs):
  ```bash
  docker compose up --build
  ```
- Start in background:
  ```bash
  docker compose up -d --build
  ```
- Stop containers:
  ```bash
  docker compose down
  ```
- View logs (if started with `-d`):
  ```bash
  docker compose logs -f
  ```
- Rebuild after changing dependencies (`package.json`/lockfile):
  ```bash
  docker compose build --no-cache
  docker compose up
  ```

#### Notes

- The dev server listens on port 3000 inside the container and is published to your host on port 3000. If 3000 is busy,
  change the left side of the mapping in `compose.yaml` (e.g., `3001:3000`).
- File watching is configured for reliability inside Docker on Windows/macOS.
- If you removed the default `CMD` from the `Dockerfile`, set `command: npm start` under the `web` service in
  `compose.yaml`.

That’s it—run `docker compose up --build` and develop at http://localhost:3000.

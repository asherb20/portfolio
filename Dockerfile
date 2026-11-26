# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Build stage
# Runs on the builder's native architecture ($BUILDPLATFORM). The output is
# plain static files, so a multi-arch build doesn't need to run Gatsby/sharp
# under QEMU emulation — only the tiny nginx stage differs per architecture.
# ---------------------------------------------------------------------------
FROM --platform=$BUILDPLATFORM node:22-bookworm-slim AS build

WORKDIR /app

ENV CI=true \
    GATSBY_TELEMETRY_DISABLED=1 \
    NODE_OPTIONS=--max-old-space-size=4096

# Install dependencies first so this layer is cached until the lockfile changes.
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

COPY . .

# Contentful credentials are mounted as BuildKit secrets: they exist only for
# this RUN step and never land in an image layer or the build history.
#   docker buildx build \
#     --secret id=contentful_access_token,env=CONTENTFUL_ACCESS_TOKEN \
#     --secret id=contentful_space_id,env=CONTENTFUL_SPACE_ID ...
RUN --mount=type=secret,id=contentful_access_token,env=CONTENTFUL_ACCESS_TOKEN,required=true \
    --mount=type=secret,id=contentful_space_id,env=CONTENTFUL_SPACE_ID,required=true \
    npm run build

# ---------------------------------------------------------------------------
# Runtime stage
# nginx-unprivileged runs as UID 101 and listens on 8080, so the pod can run
# under the Kubernetes "restricted" Pod Security Standard with no capabilities.
# No Node, npm, source code or secrets are carried into this image.
# ---------------------------------------------------------------------------
FROM nginxinc/nginx-unprivileged:stable-alpine AS runtime

LABEL org.opencontainers.image.source="https://github.com/asherb20/portfolio" \
      org.opencontainers.image.description="Asher Best portfolio site (Gatsby, served by nginx)" \
      org.opencontainers.image.licenses="UNLICENSED"

ENV NGINX_ENTRYPOINT_QUIET_LOGS=1

# Files are copied as root:root (read-only to the nginx user), so a compromised
# nginx process can't modify the site it serves.
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/public /usr/share/nginx/html

# Numeric UID so the kubelet can verify runAsNonRoot.
USER 101

EXPOSE 8080

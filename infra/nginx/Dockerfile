FROM docker.io/library/nginx:1.27-alpine

RUN apk add --no-cache openssl \
  && mkdir -p /etc/nginx/ssl \
  && openssl req -x509 -nodes -days 3650 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/server.key \
    -out /etc/nginx/ssl/server.crt \
    -subj "/CN=localhost" \
    -addext "subjectAltName=DNS:localhost,DNS:*.localhost,IP:127.0.0.1,IP:::1"

# Bake the default nginx config into the image so Compose overlays can mount a
# production `default.conf` without volume-merge collisions.
COPY default.conf /etc/nginx/conf.d/default.conf

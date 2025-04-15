FROM nginx:alpine

# Remove default nginx configuration
RUN rm -rf /etc/nginx/conf.d/*

# Create directory for static files
RUN mkdir -p /usr/share/nginx/html

# Copy static files
COPY index.html /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Create env-config.js file
RUN echo 'window.BACKEND_URL = "http://feedback-backend:8080";' > /usr/share/nginx/html/env-config.js

# Create custom nginx configuration
RUN echo 'server {\n\
    listen 8080;\n\
    server_name localhost;\n\
\n\
    # Enable CORS\n\
    add_header "Access-Control-Allow-Origin" "*" always;\n\
    add_header "Access-Control-Allow-Methods" "GET, POST, OPTIONS" always;\n\
    add_header "Access-Control-Allow-Headers" "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range" always;\n\
    add_header "Access-Control-Expose-Headers" "Content-Length,Content-Range" always;\n\
\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
\n\
    location /env-config.js {\n\
        default_type application/javascript;\n\
        return 200 "window.BACKEND_URL = \"http://feedback-backend:8080\";";\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 8080

# Use a script to start nginx with the environment variable
RUN echo '#!/bin/sh\n\
if [ -n "$BACKEND_URL" ]; then\n\
  echo "window.BACKEND_URL = \"$BACKEND_URL\";" > /usr/share/nginx/html/env-config.js\n\
fi\n\
exec nginx -g "daemon off;"' > /docker-entrypoint.sh && \
chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

FROM nginx:alpine

# Create directory for static files
RUN mkdir -p /usr/share/nginx/html

# Copy the custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static files
COPY index.html /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Create env-config.js file
RUN echo 'window.BACKEND_URL = "http://feedback-backend:8080";' > /usr/share/nginx/html/env-config.js

EXPOSE 8080

# Use a script to start nginx with the environment variable
RUN echo '#!/bin/sh\n\
if [ -n "$BACKEND_URL" ]; then\n\
  echo "window.BACKEND_URL = \"$BACKEND_URL\";" > /usr/share/nginx/html/env-config.js\n\
fi\n\
exec nginx -g "daemon off;"' > /docker-entrypoint.sh && \
chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

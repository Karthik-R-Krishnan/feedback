FROM nginx:alpine

# Copy the custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static files
COPY . /usr/share/nginx/html

# Remove the nginx.conf from the public directory to avoid it being served
RUN rm -f /usr/share/nginx/html/nginx.conf

EXPOSE 8080

# Use a script to start nginx with the environment variable
RUN echo '#!/bin/sh\n\
echo "window.BACKEND_URL = \"${BACKEND_URL:-http://feedback-backend:8080}\";" > /usr/share/nginx/html/env-config.js\n\
exec nginx -g "daemon off;"' > /docker-entrypoint.sh && \
chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

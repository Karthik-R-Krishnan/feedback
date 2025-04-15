FROM nginx:alpine

# Copy the custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Create directory for static files
RUN mkdir -p /usr/share/nginx/html

# Copy static files
COPY index.html /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

EXPOSE 8080

# Use a script to start nginx with the environment variable
RUN echo '#!/bin/sh\n\
if [ -n "$BACKEND_URL" ]; then\n\
  sed -i "s|http://feedback-backend:8080|$BACKEND_URL|g" /etc/nginx/nginx.conf\n\
fi\n\
exec nginx -g "daemon off;"' > /docker-entrypoint.sh && \
chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

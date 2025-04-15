FROM nginx:alpine

# Copy the custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static files
COPY . /usr/share/nginx/html

# Remove the nginx.conf from the public directory to avoid it being served
RUN rm -f /usr/share/nginx/html/nginx.conf

EXPOSE 80

# Use a script to start nginx with the environment variable
RUN echo '#!/bin/sh\n\
sed -i "s|\$BACKEND_URL|${BACKEND_URL:-http://feedback-backend}|g" /etc/nginx/conf.d/default.conf\n\
exec nginx -g "daemon off;"' > /docker-entrypoint.sh && \
chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

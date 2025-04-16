FROM nginx:alpine

# Create directory for static files
RUN mkdir -p /usr/share/nginx/html

# Copy static files
COPY index.html /usr/share/nginx/html/

# Create a proper nginx configuration for OpenShift
RUN echo 'server { \
    listen 8080; \
    server_name localhost; \
    \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Enable gzip compression \
    gzip on; \
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript; \
    \
    # Security headers \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-XSS-Protection "1; mode=block" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header Referrer-Policy "no-referrer-when-downgrade" always; \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
        add_header Cache-Control "no-cache, no-store, must-revalidate"; \
    } \
    \
    # Disable access to . files \
    location ~ /\. { \
        deny all; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set proper permissions
RUN chown -R appuser:appgroup /usr/share/nginx/html && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    chown -R appuser:appgroup /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid && \
    chmod -R 755 /usr/share/nginx/html && \
    chmod -R 755 /var/cache/nginx && \
    chmod -R 755 /var/log/nginx && \
    chmod -R 755 /etc/nginx/conf.d

# Switch to non-root user
USER appuser

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

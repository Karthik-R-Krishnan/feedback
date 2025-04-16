FROM nginx:alpine

# Create directory for static files
RUN mkdir -p /usr/share/nginx/html

# Copy static files
COPY index.html /usr/share/nginx/html/

# Create a proper nginx configuration for OpenShift
RUN echo 'server {\n\
    listen 8080;\n\
    server_name localhost;\n\
\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    # Enable gzip compression\n\
    gzip on;\n\
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;\n\
\n\
    # Security headers\n\
    add_header X-Frame-Options "SAMEORIGIN" always;\n\
    add_header X-XSS-Protection "1; mode=block" always;\n\
    add_header X-Content-Type-Options "nosniff" always;\n\
    add_header Referrer-Policy "no-referrer-when-downgrade" always;\n\
\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
        add_header Cache-Control "no-cache, no-store, must-revalidate";\n\
    }\n\
\n\
    # Disable access to . files\n\
    location ~ /\. {\n\
        deny all;\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set proper permissions
RUN chown -R appuser:appgroup /usr/share/nginx/html && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    chown -R appuser:appgroup /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid

# Switch to non-root user
USER appuser

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

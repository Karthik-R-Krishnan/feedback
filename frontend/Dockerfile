FROM nginx:alpine

# Create directory for static files
RUN mkdir -p /usr/share/nginx/html

# Copy static files
COPY index.html /usr/share/nginx/html/

# Create a simple nginx configuration
RUN echo 'server {\n\
    listen 8080;\n\
    server_name localhost;\n\
\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

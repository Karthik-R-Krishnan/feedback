# Use Node.js as the base image
FROM node:16

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY backend/package*.json ./

# Install the application dependencies
RUN npm install

# Copy the application code
COPY backend/ ./
COPY frontend/ ./frontend/

# Expose the port the app will run on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]

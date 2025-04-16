# Feedback Collector Application

A modern web application for collecting and displaying user feedback, deployed on Red Hat OpenShift.

## Overview

This application consists of three main components:

1. **Frontend**: A responsive web interface built with HTML, CSS, and JavaScript that allows users to submit feedback and view previous submissions.
2. **Backend**: A Node.js Express server that handles API requests, processes feedback data, and communicates with the database.
3. **Database**: A MongoDB instance that stores all feedback submissions.

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│  MongoDB    │
│  (Nginx)    │◀────│  (Node.js)  │◀────│  Database   │
└─────────────┘     └─────────────┘     └─────────────┘
```

## Features

- Submit feedback with name and message
- View all submitted feedback in chronological order
- Responsive design that works on desktop and mobile devices
- Secure API endpoints with rate limiting and CORS protection
- Health check endpoints for OpenShift monitoring

## Deployment on OpenShift

This application is designed to be deployed on Red Hat OpenShift. The deployment consists of:

1. **MongoDB Deployment**: A persistent MongoDB instance with a PVC for data storage
2. **Backend Deployment**: A Node.js application that connects to MongoDB
3. **Frontend Deployment**: A Nginx server that serves the static frontend files

### Prerequisites

- Access to an OpenShift cluster
- `oc` CLI tool installed and configured
- Git for cloning the repository

### Deployment Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/feedback-collector.git
   cd feedback-collector
   ```

2. **Deploy MongoDB**:
   ```bash
   oc apply -f openshift/mongodb-deployment.yaml
   ```

3. **Deploy the Backend**:
   ```bash
   oc apply -f openshift/backend-deployment.yaml
   ```

4. **Deploy the Frontend**:
   ```bash
   oc apply -f openshift/frontend-deployment.yaml
   ```

5. **Verify the deployment**:
   ```bash
   oc get pods
   oc get routes
   ```

## Configuration

### Environment Variables

#### Backend
- `MONGODB_URI`: Connection string for MongoDB (default: `mongodb://admin:admin123@mongodb:27017/feedback?authSource=admin`)
- `NODE_ENV`: Environment mode (default: `production`)
- `PORT`: Port to listen on (default: `3000`)

#### Frontend
- `REACT_APP_API_URL`: URL of the backend API (default: Set to the backend route URL)

## API Endpoints

- `GET /api/feedback`: Retrieve all feedback submissions
- `POST /api/feedback`: Submit new feedback
- `GET /health`: Health check endpoint

## Local Development

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or remote instance)
- npm or yarn

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/feedback-collector.git
   cd feedback-collector
   ```

2. **Install dependencies**:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the backend directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/feedbackdb
   NODE_ENV=development
   PORT=3000
   ```

4. **Start the development servers**:
   ```bash
   # Start the backend server
   cd backend
   npm start

   # Start the frontend development server
   cd ../frontend
   npm start
   ```

5. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`

## Troubleshooting

### Common Issues

1. **MongoDB Connection Issues**:
   - Verify that MongoDB is running and accessible
   - Check the connection string in the environment variables
   - Ensure the MongoDB user has the correct permissions

2. **Frontend-Backend Communication Issues**:
   - Verify that the backend API URL is correctly set in the frontend
   - Check for CORS issues in the browser console
   - Ensure the backend is running and accessible

3. **OpenShift Deployment Issues**:
   - Check the pod logs for error messages
   - Verify that all required resources (PVC, ConfigMap, etc.) are created
   - Ensure the security context constraints allow the containers to run

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Red Hat OpenShift for providing the platform
- MongoDB for the database
- Node.js and Express for the backend framework
- Nginx for serving the frontend

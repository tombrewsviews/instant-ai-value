
# Deploying to Koyeb

This guide will help you deploy the backend service to Koyeb.

## Deployment Steps

### 1. Backend Deployment

1. Log in to your Koyeb account
2. Create a new service
3. Select "GitHub" as the deployment method
4. Connect your GitHub repository
5. Configure the following settings:
   - Repository: Your GitHub repository
   - Branch: main (or your preferred branch)
   - **Source Directory**: src/backend
   - Docker Configuration:
     - Dockerfile location: Dockerfile
     - Work directory: (leave blank)
   - Environment variables:
     - PORT: 8000
     - NODE_ENV: production
   - Exposed ports: 8000
   - Health check: TCP on port 8000

### 2. Frontend Deployment

For the frontend, create a separate service:

1. Create a new service in Koyeb
2. Select "GitHub" as the deployment method
3. Connect your GitHub repository
4. Configure the following settings:
   - Repository: Your GitHub repository
   - Branch: main (or your preferred branch)
   - Source Directory: (leave blank, to use the root directory)
   - Build Command: `npm install && npm run build`
   - Run Command: `npx serve -s dist`
   - Environment variables:
     - VITE_API_BASE_URL: URL of your backend service (e.g., https://backend-service.koyeb.app)

## Troubleshooting

- If you encounter Docker daemon issues, switch to using a buildpack instead of a Dockerfile
- For the frontend, you can also consider using Netlify, Vercel, or GitHub Pages for deployment

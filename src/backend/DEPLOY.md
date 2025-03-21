
# Deploying the Backend to Koyeb

This guide will help you deploy the backend service to Koyeb.

## Prerequisites

1. Create a Koyeb account at [koyeb.com](https://www.koyeb.com)
2. Install the Koyeb CLI or use the web interface

## Deployment Steps

### Using Web Interface

1. Log in to your Koyeb account
2. Create a new service
3. Select "GitHub" as the deployment method
4. Connect your GitHub repository
5. Configure the following settings:
   - Repository: Your GitHub repository
   - Branch: main (or your preferred branch)
   - Build Command: None (we're using a Dockerfile)
   - Run Command: None (defined in Dockerfile)
   - Docker Configuration:
     - Path to Dockerfile: src/backend/Dockerfile
     - Context directory: src/backend
6. Set any required environment variables
7. Deploy the service

### Using the Koyeb CLI

```bash
# Install the Koyeb CLI
curl -fsSL https://cli.koyeb.com/install.sh | bash

# Log in to your Koyeb account
koyeb login

# Create a new service
koyeb service create backend \
  --git github.com/yourusername/your-repo \
  --git-branch main \
  --git-builder dockerfile \
  --git-dockerfile src/backend/Dockerfile \
  --git-build-context src/backend \
  --ports 5000:http \
  --routes /:5000
```

## Connecting Frontend to Backend

After deploying your backend, you'll need to:

1. Get the URL of your deployed backend service from Koyeb
2. Update your frontend code to use this URL for API calls
3. Redeploy your frontend if necessary

## Troubleshooting

- Check Koyeb logs if your service fails to start
- Ensure all environment variables are properly set
- Verify that your Dockerfile is correctly configured


# Welcome to your Lovable project

## Project structure

This project is structured with separate frontend and backend code:

- Frontend: The React application (main project directory)
- Backend: A simple Express.js server in the `src/backend` directory

## Project info

**URL**: https://lovable.dev/projects/d3d11f05-2dc1-45a1-accc-02957e26f40a

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d3d11f05-2dc1-45a1-accc-02957e26f40a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

For the backend:

```sh
# Navigate to the backend directory
cd src/backend

# Install backend dependencies (if necessary)
npm i

# Start the backend server
node server.js
```

## How can I deploy this project?

### Frontend
1. Open [Lovable](https://lovable.dev/projects/d3d11f05-2dc1-45a1-accc-02957e26f40a) and click on Share -> Publish, or
2. Deploy to a service like Netlify, Vercel, or GitHub Pages

### Backend
1. Create a service on Koyeb pointing to the `src/backend` directory
2. Set the environment variables as described in `src/backend/DEPLOY.md`
3. Deploy and get the backend URL
4. Update your frontend's environment variable `VITE_API_BASE_URL` with the backend URL

## Deployment Configuration

### Backend Deployment (Koyeb)
- Source directory: src/backend
- Dockerfile path: Dockerfile
- Environment variables: PORT=5000, NODE_ENV=production
- Exposed port: 5000

### Frontend Deployment
- Build command: npm install && npm run build
- Output directory: dist
- Environment variables: VITE_API_BASE_URL=https://your-backend-url.koyeb.app

See `src/backend/DEPLOY.md` for detailed instructions.

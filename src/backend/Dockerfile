
FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy backend code
COPY . .

# Set environment variables
ENV PORT=8000
ENV NODE_ENV=production

# Expose the port
EXPOSE 8000

# Start the server
CMD ["node", "server.js"]

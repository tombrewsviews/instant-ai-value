FROM node:18-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY ./src/backend/package*.json ./
RUN npm install

# Copy backend code
COPY ./src/backend ./

# Expose the port your app runs on
EXPOSE 8000

# Command to run the application
CMD ["node", "server.js"]
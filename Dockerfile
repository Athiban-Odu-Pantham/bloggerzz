# Use an official Node runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm version 9, which is compatible with Node.js 16
RUN npm install -g npm@9

# Install dependencies with --legacy-peer-deps to handle peer dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Install a simple server to serve the built application
RUN npm install -g serve

# Expose port 3001 to the world outside this container
EXPOSE 3001

# Run the built application using 'serve'
CMD ["serve", "-s", "build", "-l", "3001"]

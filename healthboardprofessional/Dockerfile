# Use an official Node.js runtime as the base image
FROM node:lts-bullseye as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Node.js runtime as the base image for the final container
FROM node:lts-bullseye-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built React app from the build stage
COPY --from=build /app/build ./build

# Install a simple web server for serving the static content
RUN npm install -g serve

# Expose the desired port
EXPOSE 3000

# Start the web server to serve the static React app
CMD ["serve", "-s", "build"]

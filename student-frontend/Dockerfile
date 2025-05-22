# Use Node base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build React app
RUN npm run build

# Serve the app using a simple static server
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]

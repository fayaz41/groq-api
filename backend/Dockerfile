# Use a Node.js image as the base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

RUN apk add --no-cache git
# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3001
EXPOSE 3001

# Command to run the backend
CMD ["node", "index.js"]  # Replace 'index.js' with your main script
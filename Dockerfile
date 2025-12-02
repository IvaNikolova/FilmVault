# Use Node image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build app
RUN npm run build

# Expose port
EXPOSE 5173

# Start app
CMD ["npm", "run", "dev", "--", "--host"]

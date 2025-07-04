# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies
RUN npm ci --only=production

# Copy TypeScript configuration
COPY tsconfig.json ./

# Copy source code
COPY src/ ./src/

# Install dev dependencies and build
RUN npm ci && npm run build && npm prune --production

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
  adduser -S mcp -u 1001 -G nodejs

# Change ownership of the app directory
RUN chown -R mcp:nodejs /app
USER mcp

# Expose the port (default 3000, can be overridden with PORT env var)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

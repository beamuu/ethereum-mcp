# 1. Use Node 20 as base image
FROM node:20-slim

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install deps
COPY package*.json ./
RUN npm install

# 4. Copy all source files
COPY . .

# 5. Build the TypeScript code (assumes tsconfig.json exists)
RUN npx tsc

EXPOSE 3000

# 6. Run compiled JavaScript
CMD ["node", "dist/index.js"]

FROM node:18.12.1-bullseye-slim

# Install required npm version
RUN npm install -g npm@9.1.3

# Set working directory
WORKDIR /app

# Copy dependency files
ADD package.json ./

# Install dependencies
RUN npm install

# Copy application files
ADD app.js ./
ADD inventory.js ./
ADD data/car_records.json ./data/car_records.json

# Copy any remaining files
COPY . .

# Expose API port
EXPOSE 3050

# Start the server
CMD ["node", "app.js"]
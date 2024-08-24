# Use the specified Node.js Alpine image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /www/bookadot-backend

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install && yarn cache clean

# Copy the rest of the application files to the container
COPY . .

# Run the build command using env-cmd with the specific .env file
RUN yarn build

# Expose the port
EXPOSE 3000

# Start the application
CMD [ "npm", "run", "start:prod" ]

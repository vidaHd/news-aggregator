# Use an official Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Install Yarn using the official installation script
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# Add Yarn binaries to the system PATH
ENV PATH="/root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin:$PATH"

# Copy package.json and yarn.lock to the working directory
COPY package*.json yarn.lock ./

# Install app dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the container
COPY . .

# Build the Vite.js app
RUN yarn run build

# Expose the port that the app will run on
EXPOSE 4173

# Command to run the application
CMD ["yarn", "preview"]

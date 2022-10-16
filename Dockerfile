# Define all of the Docker instructions necessary for Docker Engine to build an image of my service.

# Specifies the parent (or base) image to use as a starting point for our own image.
FROM node:16.17.0

# Define some metadata about my image. The LABEL instruction adds key=value pairs with arbitrary metadata about my image.
LABEL maintainer="Mizuho Okimoto <mokimoto@myseneca.ca>"
LABEL description="Fragments node.js microservice"

# Environment variables become part of the built image, and will persist in any containers run using this image.
# Default to use port 8080 in our service
ENV PORT=8080

# Reduce npm spam when installing within Docker.
# https://docs.npmjs.com/cli/v8/using-npm/config#loglevel
ENV NPM_CONFIG_LOGLEVEL=warn

# Disable colour when run inside Docker.
# https://docs.npmjs.com/cli/v8/using-npm/config#color
ENV NPM_CONFIG_COLOR=false

# Use /app as our working directory
WORKDIR /app

# Copy the package.json and package-lock.json files into /app
# Also able to use a relative path, since my WORKDIR is already set to /app -> COPY package*.json ./
COPY package*.json /app/

# Install node dependencies defined in package-lock.json
RUN npm install

# Copy src to /app/src/
COPY ./src ./src
# Copy our HTPASSWD file
COPY ./tests/.htpasswd ./tests/.htpasswd

# Start the container by running our server
CMD npm start

# Run my service on port 8080
EXPOSE 8080

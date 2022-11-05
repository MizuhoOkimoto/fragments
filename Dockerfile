## Stage 0: Install the base dependencies
# Specifies the parent (or base) image to use as a starting point for our own image. #To get SHA -> docker pull node:16.17.0 to make sure
FROM node:16.17.0@sha256:a5d9200d3b8c17f0f3d7717034a9c215015b7aae70cb2a9d5e5dae7ff8aa6ca8 AS dependencies

# Define some metadata about my image. The LABEL instruction adds key=value pairs with arbitrary metadata about my image.
LABEL maintainer="Mizuho Okimoto <mokimoto@myseneca.ca>" \
      description="Fragments node.js microservice"

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
# Copy all files into /app dir and change ownership to node user
COPY --chown=node:node . /app/

# Insall dependencies, but exact versions of dependencies ONLY
RUN npm ci --only=production

# Copy src to /app/src/
COPY ./src ./src
# Copy our HTPASSWD file
COPY ./tests/.htpasswd ./tests/.htpasswd

#########################################################################################################################

## Stage 1: Serve the app
FROM node:16-alpine3.15@sha256:9598b4e253236c8003d4e4b1acde80a6ca781fc231a7e670ecc2f3183c94ea5e AS production

# Environment variables become part of the built image, and will persist in any containers run using this image.
# Default to use port 8080 in our service
ENV PORT=8080

# Define for the image by default
ENV NODE_ENV=production

# Specify working dir
WORKDIR /app

# Copy the generated dependencies(node_modules). 
# From the 'dependencies' layer and copy the app dir to my current dir
COPY --from=dependencies /app /app/
# Copy the source code 
# COPY . .
COPY ./src /app/src

# Before npm start, explicit the user(node) instead of root for security
USER node

# Start the container by running our server
CMD ["npm", "start"]

# Run my service on port 8080
EXPOSE 8080

# Health Check
HEALTHCHECK --interval=15s --timeout=30s --start-period=5s --retries=3 \
  CMD curl --fail localhost:8080 || exit 1



## Build the app
FROM node:16.19.0-slim AS build

WORKDIR /app

# Copy all the app files
COPY . .

# Install all the dependencies
# npm ci makes sure the exact versions in the lockfile gets installed
# The dev dependencies have to be install since the build script depends on them
RUN npm ci --include dev

# Build the app
RUN npm run build

# # Remove all dev dependencies to reduce the amount of packages in the container
# RUN npm prune --production

CMD [ "npm", "start" ]

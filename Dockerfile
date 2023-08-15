# Build the React application
FROM node:16.20.0 AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 100000

COPY . ./
RUN yarn build

# Remove node_modules after building
RUN rm -rf node_modules

# Set up a runtime with serve
FROM node:14

WORKDIR /app

# Install serve globally
RUN yarn global add serve

# Copy the build folder from the previous step
COPY --from=build /app/build ./build

CMD ["serve", "-s", "build", "-l", "3000"]

EXPOSE 3000

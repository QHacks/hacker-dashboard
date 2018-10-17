FROM node:8

# Create app directory
WORKDIR /usr/src/qhacks-dashboard/client

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the client with webpack
RUN npm run build-client

# Start the server
CMD [ "npm", "start" ]

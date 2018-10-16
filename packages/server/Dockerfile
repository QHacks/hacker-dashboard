FROM node:8

# Create app directory
WORKDIR /usr/src/qhacks-dashboard/server

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build emails from templates
RUN npm run build-emails

# Expose port 8080 for server
EXPOSE 8080

# Start the server
CMD [ "npm", "start" ]

FROM node:8

# Create app directory
WORKDIR /usr/src/qhacks-dashboard/bot

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Start the server
CMD [ "npm", "start" ]

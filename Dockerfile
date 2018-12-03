FROM node:10
WORKDIR /app
COPY . /app/
RUN npm run bootstrap
RUN npm run build
CMD npm start
EXPOSE 3000

FROM node:10
WORKDIR /app
COPY . /app/
RUN npm run bootstrap
RUN npm run build
RUN cp -a packages/client/assets packages/client/bundle
CMD npm start
EXPOSE 3000

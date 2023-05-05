
#base image to build from
FROM node:18.16-alpine3.17

#App directory to build
WORKDIR /usr/src/app
#Copy package.json files
COPY package*.json ./
#Run npm install to install node modules
COPY tables tables

COPY app.js app.js

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "start"]

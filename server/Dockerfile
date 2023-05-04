
#base image to build from
FROM node:18.16-alpine3.17

#App directory to build
WORKDIR /server/app
#Copy package.json files
COPY package*.json ./
#Run npm install to install node modules
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]

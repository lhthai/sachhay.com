FROM node:10-alpine
WORKDIR /usr/src/sachhay_server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "npm", "start" ]

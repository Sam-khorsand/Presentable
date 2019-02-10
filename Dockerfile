FROM node:8

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install
RUN npm client-install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]
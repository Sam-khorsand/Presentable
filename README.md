# Presentable
Data Visualization App

App is deployed to [heroku](https://fast-brook-52751.herokuapp.com/)

# Installation guide

cd /server

npm install

cd /client

npm install

// Run the app

From root directory:

npm run dev

# Docker deployment

First change the proxy value in client's package.json from localshot:5000 to express:5000, as the name of the server image is set to express.


From root directory:


docker-compose build


docker-compose run
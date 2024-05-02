# Carmex - NodeJS Web App
This project is simple NodeJS Web App using REST API.
It allows to add, edit and delete clients, cars and reservations from the system.
	
## Tech Stack
* NodeJS
* Express.js
* Sequelize
* MySQL
	
## Setup
To setup this project you have to do these steps:

```
$ git clone [repo]
$ cd [repo]
$ cd docker
$ docker compose up
```
Now, you have to create scheme in database for our data.
- type [localhost:8183](https://localhost:8183) in the browser
- log in with root credentials

![image](https://github.com/k4mien/carmex/assets/56881087/060be6ad-daa0-46ba-9558-5e9fdcaf17bb)

- execute ``` CREATE SCHEMA IF NOT EXISTS `tin` ``` in phpmyadmin console

Go back to the terminal:
```
$ cd ..
$ npm install
$ npm start
```
Done, app should be running at [localhost:3000](https://localhost:3000)

## Demo

![ezgif-1-33363198b7](https://github.com/k4mien/carmex/assets/56881087/cfaa1291-87cb-47e1-b895-72c325bedb95)

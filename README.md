# nosqlconcepts for database education
## nosqlconcepts 

tasks based on https://sqlzoo.net/wiki/SQL_Tutorial 
 
## Installation and usage

# Installation requirements

- Docker
- Git

# Clone repository

Clone the Repository by using the command: `git clone https://github.com/VaneMeyer/sqlzooTutorialGerman.git`

# Set the environment variables & passwords

Navigate to the cloned directory of your project and create a `.env` file inside. It has to contain the same 
environment variables as the [template `.env` file](.env.sample) with proper values to setup the database and 
establish a connection to it in the backend.

Change the password in the [sql script](db/dashboardUser.sql) according to the value set in the `.env` file.

# Create the docker proxy network

Create the docker network called "proxy_nw" with the following command: `docker network create proxy_nw`

# Build the containers

Inside the project directory, build the ensemble of containers: `docker compose build`

# Start the environment

Start the app using the following command within the project directory: `docker compose up -d`

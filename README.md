# sqlzooTutorialGerman
## nosqlconcepts sqlZoo Turorial german

based on https://sqlzoo.net/wiki/SQL_Tutorial 
 
## Installation and Usage

0. Requirements:

- Docker
- Git

1. Clone Repository: 

Clone the Repository by using the command: `git clone https://github.com/VaneMeyer/sqlzooTutorialGerman.git`

2. Set the environment

Navigate to the cloned directory of your project and create a `.env` file inside. It has to contain the same 
environment variables as the [template `.env` file](.env.sample) with proper values to setup the database and 
establish a connection to it in the backend.

3. Build the containers: 

Inside the project directory, build the ensemble of containers: `docker compose build`

4. Start the environment: 

Start the app using the following command within the project directory: `docker compose up -d`

# NutriTrack
#### A Sustainable Nutrition Tracking App

## Getting startet:
### React Native:
- Follow this [instructions](https://reactnative.dev/docs/environment-setup?guide=native) for **Installing dependencies & Android Development Environment** 

#### Android Studio:
- start android studio and open the ./frontend/android folder
- open the Device Manager on the far ride side and run the Pixel 3a API

#### IDE:
- run `npm install` in ./frontend after cloning
- run `npm start` and press `d` after the dev server is ready

The Device should now display the React Native App

### Spring Boot:
#### Docker:
- run `docker-compose up` in the main directory

#### Local:
- run `mvnw spring-boot:start` in ./backend

## ToDo:
- Db setup for docker
- develop REST-API (Want to make an actually good API? Read the [Zalando RESTful api and events guidelines](https://opensource.zalando.com/restful-api-guidelines/))
- (Use Insomnia instead of Postman, all my homies hate Postman)
  
Let's just focus on making the API work, frontend will follow later

# Global INFO

## Database model
[model](https://drawsql.app/teams/swt-2/diagrams/nutrack)

## Start all dockers
docker compose --profile "*" up -d

## Stop all dockers
docker compose --profile "*" down

# DB INFO

## Start
docker compose --profile db up -d

## Stop
docker compose --profile db down

## Delete volume
docker compose --profile db down -v 

# pgAdmin INFO

## Start
docker compose --profile pgAdmin up -d

## Stop
docker compose --profile pgAdmin down

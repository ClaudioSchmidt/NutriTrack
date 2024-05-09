# SustainableNutritionTrackingApp
SWT Project

# Global INFO

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
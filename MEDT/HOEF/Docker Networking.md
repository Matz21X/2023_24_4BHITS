# Docker Networking
#MEDT #HOEF 


- Build Exoplanets RestAPI to image  
  - create Dockerfile    ```    FROM node:19.0.0-alpine    ADD . .    CMD ["node", "app.js"]    ``` 
   - dbConfig.js -> use container name (e.g. `exoplanetsDb_4bhits`) as host  - `docker build -t exoplanets_rest_api:latest .`  - `docker build -t exoplanets_rest_api:1.0.0 .`- docker network  
  - create network with network driver "bridge"      `docker network create -d bridge exoplanetsNetwork`  - bridge network uses separate network for containers- db container re-created  
  - `docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=mysql --name exoplanetsDb_4bhits --network exoplanetsNetwork  mysql_exoplanets_4bhits`  - `docker exec -it exoplanetsDb_4bhits sh create_load.sh`- expressjs container created  
  - `docker run -it --name exoplanetsExpressjs -p 8000:8000 --network exoplanetsNetwork  exoplanets_rest_api`
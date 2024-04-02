·         docker pull <image:version>: Zieht ein Docker-Image aus dem Repository.

·         docker run -it -rm <image> <application>: startet einen Container mit einer interaktiven Terminalverbindung, welcher nach dem Schließen automatisch gelöscht wird.

·         docker images: Listet alle auf dem System verfügbaren Images auf.

·         docker ps: Zeigt laufende Docker-Prozesse an.

·         docker logs <container/id>: Überprüft die Logs eines Containers

 docker stop <container/id>: Stoppt einen laufenden Docker-Container.

Docker kill <container/id>: Beendet einen Docker-Container ohne Wartezeit.

Docker rm <container/id>: Entfernt einen Docker-Container.

Docker rmi <image>: Entfernt ein Docker-Image vom System.

 Docker tag <image:version> <new_image_name>: benennt Images um
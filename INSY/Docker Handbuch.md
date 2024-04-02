# Docker



1. **docker run**: Startet einen Container aus einem Image.
   ```bash
   docker run -d --name my_container nginx
   ```
   Erklärun:
   - `-d`: Startet den Container im Hintergrund (detach mode).
   - `--name my_container`: Gibt dem Container einen Namen ("my_container").
   - `nginx`: Das verwendete Docker-Image, in diesem Fall Nginx.
****
2. **docker pull**: Lädt ein Image von einem Docker-Registry herunter.
   ```bash
   docker pull ubuntu:latest
   ```
   Erklärung:
   - `ubuntu:latest`: Das zu ziehende Image. Hier wird die neueste Version von Ubuntu heruntergeladen.
****
3. **docker build**: Baut ein Docker-Image aus einem Dockerfile.
   ```bash
   docker build -t my_image .
   ```
   Erklärung:
   - `-t my_image`: Taggt das erstellte Image mit dem Namen "my_image".
   - `.`: Der Pfad zum Verzeichnis, das das Dockerfile enthält. Hier wird das aktuelle Verzeichnis verwendet.
****
4. **docker ps**: Zeigt alle laufenden Container an.
   ```bash
   docker ps
   ```
   Erklärung:
   - Zeigt eine Liste der laufenden Container zusammen mit ihren IDs, Namen und Status an.
****
5. **docker images**: Zeigt alle verfügbaren Images an.
   ```bash
   docker images
   ```
   Erklärung:
   - Zeigt eine Liste aller lokal verfügbaren Docker-Images an.
****
6. **docker stop**: Stoppt einen laufenden Container.
   ```bash
   docker stop my_container
   ```
   Erklärung:
   - `my_container`: Der Name oder die ID des Containers, der gestoppt werden soll.
****
7. **docker rm**: Löscht einen oder mehrere Container.
   ```bash
   docker rm my_container
   ```
   Erklärung:
   - `my_container`: Der Name oder die ID des Containers, der gelöscht werden soll.
****
8. **docker rmi**: Löscht ein oder mehrere Images.
   ```bash
   docker rmi my_image
   ```
   Erklärung:
   - `my_image`: Der Name oder die ID des Images, das gelöscht werden soll.
****
9. **docker exec**: Führt ein Befehl in einem laufenden Container aus.
   ```bash
   docker exec -it my_container bash
   ```
   Erklärung:
   - `-it`: Interaktiver Modus.
   - `my_container`: Der Name oder die ID des Containers, in dem der Befehl ausgeführt werden soll.
   - `bash`: Der Befehl, der im Container ausgeführt werden soll (hier: Starte eine Bash-Shell).
****
10. **docker-compose up**: Startet Dienste basierend auf Konfigurationen in einem `docker-compose.yml`-File.
    ```bash
    docker-compose up -d
    ```
    Erklärung:
    - `-d`: Startet die Dienste im Hintergrund (detach mode).
****
11. **docker-compose build**: Baut Dienste basierend auf Konfigurationen in einem `docker-compose.yml`-File.
    ```bash
    docker-compose build
    ```
    Erklärung:
    - Baut die im Docker-Compose-Konfigurationsfile definierten Dienste neu.s
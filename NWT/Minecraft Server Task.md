# Protokoll
#NWT 

## Setup
Ubuntu + Minecraft Server (1.20.2)

```bash
# Java install
sudo apt install openjdk-17-jre-headless 

# Enable port
sudo ufw allow 25565

# Make server folder
mkdir server

# Get Server files
wget
https://launcher.mojang.com/v1/objects/c8f83c5655308435b3dcf03c06d9fe8740a77469/server.jar

# Run Server 1st time
sudo java -Xms2G -Xmx2G -jar server.jar nogui

# Accept eula in eula.txt
nano eula.txt (eula=true)

# DONE!
sudo java -Xms2G -Xmx2G -jar server.jar nogui
```

![[Pasted image 20231215133302.png]]

## Securing the server
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

1. **Denying ssh root login**

```bash
# Change permission
sudo nano /etc/ssh/sshd_config
PermitRootLogin no # Change to no
PubkeyAuthentification yes # Comment in

# Restart ssh server
service ssh restart
```

2.  **Change SSH-Server port**
   
```bash
# Open ssh config file and e
sudo nano /etc/ssh/sshd_config

```
4. **Only allow access from local network**
   
```bash
# server.properties file
# input local ip
server-ip=192.168.132.11

# Block port on firewall
sudo iptables -A INPUT -p tcp --dport 25565 -j DROP
```
Optionally disable Port-forwarding on your router

3.  **Add user "minecraft" to start server**

```bash
# Create user "minecraft" without home directory / without login shell
sudo adduser --system --no-create-home --group 

# Switch user and copy server files to new user
su - minecraft
cd ~
cp -r ~/server

# Create startup script
nano start.sh
"""
#!/bin/bash
java -Xmx1G -Xms1G -jar server.jar nogui
"""

	# Add permissions
chmod +x start.sh
```

Server start example:
```bash
su - minecraft
./start.sh
```
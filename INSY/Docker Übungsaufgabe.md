# Docker Übungsaufgabe
#INSY 

### 1. Neuen Ubuntu Container herunterladen:
```bash
docker pull ubuntu
```

![[Pasted image 20240128163454.png]]

### 2. Container starten:
```bash
docker run -ti ubuntu /bin/bash
```

![[Pasted image 20240128163853.png]]
(Startet container im interactive modus)


### 3. Paketmanager aktualisieren und tree herunterladen:
```bash
apt update
apt upgrade
apt install tree
```

![[Pasted image 20240128164328.png]]

### 4. Tree Befehl ausführen:
```bash
tree
```

![[Pasted image 20240128164439.png]]Tree zeigt die Ordnerstruktur an. Es wird verwendet um Strukturen zu visualisieren.
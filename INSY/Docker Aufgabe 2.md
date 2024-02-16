# Docker Aufgaben 2
#INSY #STO

## Aufgabe 1:

**3 Hauptvarianten vom Node Image:**

- <span style="color:#00b050">node</span>
	- Standard node version
	- Groß
	- Hat schon viele dependencies vorinstalliert
	- 952 MB
- <span style="color:#00b050">node-alpine</span>
	- Basierend auf Alpine-Linux (lightweight)
	- Enthält nur das notwendigste
	- 178 MB
- <span style="color:#00b050">node-slim</span>
	- Oft basierend auf Debian, CentOS
	- Enthält ebenfalls nur die notwendigsten Abhängigkeiten
	- Könnte größer als das Alpine-Image sein
	- ~188 MB

**Image herunterladen und umbenennen:**

```powershell
docker pull node:alpine
docker image tag node:alpine small-node
```

**Container erstellen und nach dem schließen löschen:**

```
docker run --rm -it small-node
```
![[Pasted image 20240214154956.png]]


# Aufgabe 2:

```
docker pull node
docker run -it node
docker exec -it <container_ID> /bin/bash
```

![[Pasted image 20240214161004.png]]

![[Pasted image 20240214161346.png]]




## Aufgabe 3:

![[Pasted image 20240214161811.png]]

![[Pasted image 20240214184856.png]]
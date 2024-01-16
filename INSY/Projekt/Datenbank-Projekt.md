# Protokoll (Hrbek & Thienel)
#INSY 

In diesem Projekt wird eine Datenbank für einen Online-Einzelhandel. Datenbank (Postgres) und API (NodeJS) laufen in Docker Containern

**Software:**
- Docker
- NodeJS
- Postgres

## Datenbankstruktur
![[Pasted image 20240116081853.png]]
Für jede Tabelle sind die CRUD-Operations über die API verfügbar
## Startup:

1. Start Docker-Postgres Container
```powershell
PS C:\Users\matth> docker start postgres
postgres
```
1. Start API with `npm start`
```powershell
PS C:\Users\matth\Documents\2023_24_4BHITS\INSY\Projekt\REST> npm start

> rest@1.0.0 start
> node index.js

Server läuft auf http://localhost:3000
```
3. Start Python GUI

Note:
```bash
pyinstaller main.py --onefile -w
```
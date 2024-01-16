# Protokoll (Hrbek & Thienel)
#INSY #Projekt

In diesem Projekt wird eine Datenbank für einen Online-Einzelhandel. Datenbank (Postgres) und API (NodeJS) laufen in Docker Containern

**Software:**
- Docker
- NodeJS
- Postgres

## Datenbankstruktur
![[Pasted image 20240116081853.png]]

Für jede Tabelle sind die CRUD-Operations über die API verfügbar. Doku: https://localhost:3000/api-docs

![[Pasted image 20240116084427.png]]

### Python Tabellen Anzeige (Programm)
Programm zeigt Inhalte aller Tabellen an 

![[Pasted image 20240116092121.png]]

## Startup:

1. Start Docker-Postgres & API Container
```powershell
PS C:\Users\matth> docker start postgres
PS C:\Users\matth> docker start esnAPI
```





```bash
pyinstaller main.py --onefile -w
```
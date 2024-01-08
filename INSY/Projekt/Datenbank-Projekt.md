# Protokoll (Hrbek & Thienel)
#INSY 

In diesem Projekt wird eine Datenbank für einen Online-Einzelhandel verwirklicht.

**Software:**
- Docker
- NodeJS
- Postgresql

## Datenbankstruktur
![[Pasted image 20231227172232.png]]

**SQL query:**
```SQL
-- Kunden-Tabelle  
CREATE TABLE Kunden (  
    id SERIAL PRIMARY KEY,  
    name VARCHAR(255),  
    Ort VARCHAR(255)  
);  
  
-- Produkte-Tabelle  
CREATE TABLE Produkte (  
    id SERIAL PRIMARY KEY,  
    name VARCHAR(255),  
    Preis DECIMAL(10, 2),  
    Gewicht DECIMAL(10, 2)  
);  
  
-- Bestellungen-Tabelle mit Fremdschlüsselbeziehungen zu Kunden und Produkte  
CREATE TABLE Bestellungen (  
    id SERIAL PRIMARY KEY,  
    kunden_id INTEGER REFERENCES Kunden(id),  
    produkt_id INTEGER REFERENCES Produkte(id),  
    anzahl INTEGER,  
    betrag DECIMAL(10, 2),  
    bestelldatum DATE  
);  
  
-- Lager-Tabelle mit Fremdschlüsselbeziehungen zu Produkte  
CREATE TABLE Lager (  
    id SERIAL PRIMARY KEY,  
    produkt_id INTEGER REFERENCES Produkte(id),  
    anzahl INTEGER,  
    datumNeulieferung DATE  
);
```

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
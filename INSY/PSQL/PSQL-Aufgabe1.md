# PSQL Aufgabe 1
#INSY 

**Aufgabenstellung**

1. Installieren Sie einen PostgreSQL-Server sowohl unter Windows als auch unter Linux.
2. Erzeugen Sie spezielle User unter PostgreSQL: a) Superuser b) User, der Datenbanken anlegen, befüllen und auslesen kann c) User, der nur in einer Datenbank Daten auslesen kann.
3. Versuchen Sie unter Windows mit dem `psql`-Kommando auf Daten unter Linux zuzugreifen.
4. Versuchen Sie unter Linux mit dem `psql`-Kommando auf Daten unter Windows zuzugreifen.
5. Dokumentieren Sie die wichtigsten Schritte mit Befehlen und Screenshots.

### Installation

_Für Windows_

Sie können PostgreSQL für Windows von der [offiziellen Website](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) herunterladen. Wählen Sie die Version 16 Windows x86-64 aus und führen Sie den Installer aus. Folgen Sie den Anweisungen des Wizards.

_Für Linux_

Führen Sie die folgenden Befehle aus, um PostgreSQL unter Linux zu installieren:

```bash
#Erstellen Sie die Konfigurationsdatei für das Repository: sudo sh -c 'echo "deb https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'  # Importieren Sie den Repository-Signaturschlüssel: wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add –  # Aktualisieren Sie die Paketliste: sudo apt-get update  # Installieren Sie die neueste Version von PostgreSQL: sudo apt-get -y install postgresql
```

### User erstellen

a) Superuser erstellen:

`CREATE USER new_superuser WITH SUPERUSER PASSWORD 'password'; \password new_superuser; CREATE DATABASE new_superuser;`

b) User erstellen, der Datenbanken anlegen, befüllen und auslesen kann:

`CREATE USER new_user PASSWORD 'password' CREATEDB; GRANT CREATE ON SCHEMA public TO new_user; GRANT USAGE ON SCHEMA public TO new_user; CREATE DATABASE new_user;`

c) User erstellen, der nur in einer Datenbank Daten auslesen kann:

`CREATE USER newer_user PASSWORD 'password'; CREATE DATABASE newer_user; GRANT SELECT ON ALL TABLES IN SCHEMA newer_user TO newer_user;`

### Zugriff auf Daten unter Windows von Linux

Bearbeiten Sie die PostgreSQL-Konfigurationsdatei und die `pg_hba.conf`-Datei:

`sudo nano /etc/postgresql/13/main/postgresql.conf sudo nano /etc/postgresql/13/main/pg_hba.conf`

Starten Sie den Server mit:

`systemctl start postgresql.service`

### Zugriff auf Daten unter Linux von Windows

Bearbeiten Sie die `pg_hba.conf`-Datei, die sich in `C:\Program Files\PostgreSQL\16rc1\data` befindet:

`pg_ctl restart -D "C:\Program Files\PostgreSQL\16rc1\data"`

Hinweis: Bitte passen Sie die Pfadangaben und Versionsnummern entsprechend Ihrer tatsächlichen Installation an.
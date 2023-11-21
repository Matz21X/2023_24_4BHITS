# PSQL Aufgabe 1
#INSY 

### Spezielle user unter PostgreSQL anlegen

- **Superuser**

```SQL
CREATE USER superuser_name SUPERUSER PASSWORD 'superuser_password';
```

![[Pasted image 20230926161135.png]]


- **User (DB anlegen, befüllen und auslesen)**

```SQL
CREATE ROLE user1 LOGIN PASSWORD 'user1_password';
CREATE DATABASE mainDB OWNER superuser;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO user1;
```

![[Pasted image 20230926163329.png]]


- **User (DB auslesen)**

```SQL
CREATE ROLE read LOGIN PASSWORD 'passwort';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO read;
GRANT CONNECT ON DATABASE mainDB TO read;
```

![[Pasted image 20230926163959.png]]


### Linux vorgehensweise 

- **Login**

```bash
sudo -i -u postgres
psql -U postgres
```

- **Remote Login zulassen
![[Pasted image 20231003120913.png]]

### Windows good-to-knows

**Starten / stoppen / neustart**

```bash
net stop postgresql-x64-16
net start postgresql-x64-16
net restart postgresql-x64-16
```

```SQL
INSERT INTO table_name (name, age, height) VALUES ('Flo', 17, 185)
```
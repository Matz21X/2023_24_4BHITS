# WordPress install
#INSY #STO 


**Download von WordPress:** https://de-at.wordpress.org/download/

Zip-File entpacken in `C:\xampp\htdocs`

**Datenbankuser für WordPress erstellen:**

```bash
mysql -u root
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON . TO 'username'@'localhost';

# Mit User anmelden

mysql -u username -p
CREATE DATABASE Word;
```

****
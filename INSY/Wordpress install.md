# WordPress install
#INSY #STO 


**Download von WordPress:** https://de-at.wordpress.org/download/

Zip-File entpacken in `C:\xampp\htdocs`

**Datenbankuser für WordPress erstellen:**

```bash
mysql -u root
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
# CREATE USER 'cms'@'localhost' IDENTIFIED BY 'w0rdpress';
GRANT ALL PRIVILEGES ON . TO 'username'@'localhost';

# Mit User anmelden

mysql -u username -p
CREATE DATABASE Word;
```

**Weboberfläche aufrufen:**
`localhost/wordpress`

![[Wordpress install-20240430130610249.png]]
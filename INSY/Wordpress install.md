# Wordpress install
#INSY #STO 

https://de-at.wordpress.org/download/
Zip File Ruterladen 
in den Ordner: C:\xampp\htdocs (wo du halt XAMP hast)

**Download von WordPress:** https://de-at.wordpress.org/download/

Zip-File entpacken in `C:\xampp\htdocs`

XAMP:
Appache + Mysql Starten

Terminal:

mysql -u root
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON . TO 'username'@'localhost';

mit den neuen User anmelden:
mysql -u username -p
CREATE DATABASE Word;

Browser:
localhost/wordpress

Der Anleitung Folgen:

Database
Username mit Passwort

Bis man zur Startseite kommt
# MSSQL Projekt
#INSY #STO 

## 1. Installation

1. **Laden Sie den öffentlichen Schlüssel herunter, konvertieren Sie ihn aus dem ASCII- in das GPG-Format und schreiben Sie ihn an den erforderlichen Speicherort:**

```bash
curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor -o /usr/share/keyrings/microsoft-prod.gpg
```


2. **Laden Sie das Ubuntu-Repository von SQL Server manuell herunter und registrieren Sie es:**

```bash
curl -fsSL https://packages.microsoft.com/config/ubuntu/22.04/mssql-server-2022.list | sudo tee /etc/apt/sources.list.d/mssql-server-2022.list
```


3. **Führen Sie die folgenden Befehle aus, um SQL Server zu installieren:**

```bash
sudo apt-get update
sudo apt-get install -y mssql-server
```

4. **Nachdem die Paketinstallation abgeschlossen ist, führen Sie `mssql-conf setup` aus, und befolgen Sie die Anweisungen, um das Systemadministratorkennwort festzulegen und Ihre Edition auszuwählen. Zur Erinnerung: Für die folgenden SQL Server -Editionen sind kostenlose Lizenzen verfügbar: Evaluation, Developer und Express.**

```bash
sudo /opt/mssql/bin/mssql-conf setup
```
Denken Sie daran, ein sicheres Kennwort für das SA-Konto anzugeben. Sie benötigen mindestens 8 Zeichen, einschließlich Großbuchstaben und Kleinbuchstaben, Ziffern und/oder nicht-alphanumerische Symbole.


5. **Nachdem die Konfiguration abgeschlossen ist, überprüfen Sie, ob der Dienst ausgeführt wird:**
```bash
systemctl status mssql-server --no-pager
```


6. **Wenn Sie eine Remoteverbindung planen, müssen Sie möglicherweise auch den SQL Server-TCP-Port (standardmäßig 1433) in Ihrer Firewall öffnen.**


## 2. Client Applikationen

### GUI Tools

**Linux:**
<span style="color:#00b050">DBeaver</span>
![[MSSQL Projekt-20240617212302109.png]]

**Windows:**
<span style="color:#00b050">DataGrip</span>

![[MSSQL Projekt-20240617184844059.png]]


### CLI-Tools

**Windows:** mssql-cli

```bash
python -m pip install mssql-cli
```

**Linux:** sqlcmd


## 3. Konvertierung

(Es war ein Krampf)

**SQL Migration Assistant for MySQL**

![[MSSQL Projekt-20240617212501925.png]]

- Daten in MySQL Datenbank hineingeladen
- Mit Tool in MSSQL Datenbank migriert


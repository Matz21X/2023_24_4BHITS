# CMS-Website and CMS-PHP-Site

#INSY #STO 


![[Wordpress install]]


## CMS Struktur erzeugen

![[CMS-Website and CMS-PHP-Site-20240527184147490.png]]

Wie man links an der Seitenleiste erkennen kann, stellt WordPress einem die Grundfunktionen eines CMS direkt dar.
(Blog posts, Media management, Page management, Comments, Page Design...)

### Nachahmung der HTL-Seite

Ich habe mich für ein simples / minimalistisches Design entschieden. Inhalte sind sarkastisch.

![[CMS-Website and CMS-PHP-Site-20240527185250715.png]]


## Eigenes PHP Programm einbinden

Um eine Tabelle aus meiner Datenbank anzuzeigen habe ich PHP-Code in Verbindung mit dem Plugin "WPCode" verwendet. Das Plugin musste zuerst aus dem Plugin-Store heruntergeladen und anschließend aktiviert werden.

Der Code musste anschließend als neues Snippet angelegt uns gespeichert werden. Um das Snippet einzubinden wir die Shortcode Funktion verwendet.
![[CMS-Website and CMS-PHP-Site-20240527185745109.png]]
Dieser wird dann einfach als Text in die Seite eingefügt. In meinem Fall "[wpcode id="49"]"

Hier der verwendete PHP-Code:

```php
// Funktion zur Anzeige der Tabelle

    // Datenbankverbindungsparameter
    $servername = "localhost";
    $username = "root";
    $dbname = "w3schools";
    $tablename = "products";

    // Verbindung zur Datenbank herstellen
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verbindung überprüfen
    if ($conn->connect_error) {
        die("Verbindung fehlgeschlagen: " . $conn->connect_error);
    }

    // SQL-Abfrage
    $sql = "SELECT * FROM " . $tablename;
    $result = $conn->query($sql);

    // HTML-Tabelle starten
    echo '<figure class="wp-block-table"><table>';
    echo '<tr>';

    // Kopfzeile erstellen
    if ($result->num_rows > 0) {
        // Hole die Spaltennamen
        while ($fieldinfo = $result->fetch_field()) {
            echo '<th>' . htmlspecialchars($fieldinfo->name) . '</th>';
        }
        echo '</tr>';

        // Datenzeilen hinzufügen
        while ($row = $result->fetch_assoc()) {
            echo '<tr>';
            foreach ($row as $value) {
                echo '<td>' . htmlspecialchars($value) . '</td>';
            }
            echo '</tr>';
        }
    } else {
        echo '<tr><td colspan="100%">Keine Daten gefunden</td></tr>';
    }
    echo '</table></figure>';

    // Verbindung schließen
    $conn->close();

```

Mit echo wird der HTML Quellcode in den Browser injiziert.

Das Endergebnis sieht folgendermaßen aus:

![[CMS-Website and CMS-PHP-Site-20240527190311721.png]]
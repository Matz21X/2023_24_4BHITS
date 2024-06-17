### Abfragen über eine Tabelle

1. **Zeige alle verfügbaren Daten der Tabelle „Verein“ an.**
    ```sql
    SELECT * FROM Verein;
    ```

2. **Welche Vereine spielen in der ersten Liga?**
    ```sql
    SELECT Name FROM Verein WHERE Liga = 1;
    ```

3. **Wann war die Erstaustragung eines Spiels der ersten Fußball-Bundesliga?**
    ```sql
    SELECT Erstaustragung FROM Liga WHERE Liga_Nr = 1;
    ```

4. **Wähle Liga_Nr, Verband und Rekordspieler aller drei Ligen aus.**
    ```sql
    SELECT Liga_Nr, Verband, Rekordspieler FROM Liga;
    ```

5. **Welche Ausgabe wird durch die folgende SQL-Abfrage erzeugt?**
    ```sql
    SELECT Liga_Nr, Erstaustragung, Meister FROM Liga WHERE Spiele_Rekordspieler > 500;
    ```
    Diese Abfrage gibt die `Liga_Nr`, `Erstaustragung` und `Meister` der Ligen zurück, deren `Spiele_Rekordspieler` mehr als 500 Spiele haben.

6. **An welchem Tag fand das erste Spiel in dieser Saison statt?**
    ```sql
    SELECT MIN(Datum) FROM Spiel;
    ```

7. **An wie vielen Spielen haben die Rekordspieler aller drei Ligen insgesamt teilgenommen?**
    ```sql
    SELECT SUM(Spiele_Rekordspieler) FROM Liga;
    ```

8. **Welche Spieler haben in dieser Saison bereits mehr als fünf Tore geschossen? Ordne Sie absteigend nach der Anzahl ihrer Tore.**
    ```sql
    SELECT Spieler_Name, Tore FROM Spieler WHERE Tore > 5 ORDER BY Tore DESC;
    ```

9. **Wie viele Spieler tragen die Trikot-Nr 12? Benenne die Ergebnisspalte in „Anzahl“ um.**
    ```sql
    SELECT COUNT(*) AS Anzahl FROM Spieler WHERE Trikot_Nr = 12;
    ```

10. **Welche deutschen Spieler (Land: D) haben in dieser Saison noch an keinem Spiel teilgenommen?**
    ```sql
    SELECT Spieler_Name FROM Spieler WHERE Land = 'D' AND Spiele = 0;
    ```

11. **Zeige die Daten aller Spiele an, die am ersten Spieltag aller drei Ligen nach 17 Uhr begonnen haben.**
    ```sql
    SELECT * FROM Spiel WHERE Spieltag = 1 AND Uhrzeit > '17:00:00';
    ```

12. **Wer ist der Rekordspieler der zweiten Bundesliga und an wie vielen Spielen hat er teilgenommen?**
    ```sql
    SELECT Rekordspieler, Spiele_Rekordspieler FROM Liga WHERE Liga_Nr = 2;
    ```

13. **Wie viele Tore wurden bisher durchschnittlich von den Spielern geschossen, die schon an mehr als zehn Spielen teilgenommen und mehr als drei Vorlagen geliefert haben?**
    ```sql
    SELECT AVG(Tore) FROM Spieler WHERE Spiele > 10 AND Vorlagen > 3;
    ```

14. **Liste alle Spiele auf, die im August stattgefunden und nach 19 Uhr begonnen haben.**
    ```sql
    SELECT * FROM Spiel WHERE MONTH(Datum) = 8 AND Uhrzeit > '19:00:00';
    ```

### Abfragen über mehrere Tabellen (Join)

15. **Welcher Verein ist aktuell Meister der ersten Liga?**
    ```sql
    SELECT Name FROM Verein WHERE V_ID = (SELECT Meister FROM Liga WHERE Liga_Nr = 1);
    ```

16. **Wer (Name) hat am ersten Spieltag gegen „Dynamo Dresden“ gespielt? Finde die V_ID von „Dynamo Dresden“ zuvor mit einer eigenen SQL-Abfrage heraus.**
    ```sql
    -- Zuerst die V_ID von Dynamo Dresden finden
    SELECT V_ID FROM Verein WHERE Name = 'Dynamo Dresden';
    -- Dann den Gegner finden
    SELECT Name FROM Verein WHERE V_ID = (
        SELECT Gast FROM Spiel WHERE Heim = (SELECT V_ID FROM Verein WHERE Name = 'Dynamo Dresden') AND Spieltag = 1
        UNION
        SELECT Heim FROM Spiel WHERE Gast = (SELECT V_ID FROM Verein WHERE Name = 'Dynamo Dresden') AND Spieltag = 1
    );
    ```

17. **Welche Spieler spielen für den Verein „FC Bayern München“? Gib auch die Trikotnummer und das Heimatland jedes Spielers sowie die Anzahl seiner Tore mit aus. Ordne die Ergebnisse aufsteigend nach der Trikotnummer.**
    ```sql
    SELECT Spieler_Name, Trikot_Nr, Land, Tore 
    FROM Spieler 
    WHERE Vereins_ID = (SELECT V_ID FROM Verein WHERE Name = 'FC Bayern München')
    ORDER BY Trikot_Nr ASC;
    ```

18. **Welche Ausgabe wird durch die folgende SQL-Abfrage erzeugt?**
    ```sql
    SELECT Spieler_Name, Land
    FROM Spieler, Verein
    WHERE Vereins_ID = V_ID AND V_ID = (SELECT V_ID FROM Verein WHERE Name = 'FC Augsburg');
    ```
    Diese Abfrage gibt die `Spieler_Name` und `Land` aller Spieler zurück, die für den Verein `FC Augsburg` spielen.

19. **Wie viele Spieler hat jeder Verein der ersten Liga? Gib die Ergebnisse mit dem Vereinsnamen aus und ordne sie absteigend nach der Anzahl der Spieler.**
    ```sql
    SELECT Verein.Name, COUNT(Spieler.Spieler_ID) AS Anzahl_Spieler
    FROM Verein 
    JOIN Spieler ON Verein.V_ID = Spieler.Vereins_ID
    WHERE Liga = 1
    GROUP BY Verein.Name
    ORDER BY Anzahl_Spieler DESC;
    ```

20. **An welchen Tagen finden die Spiele der ersten Liga statt? Hinweis: Jedes Datum darf nur einmal ausgegeben werden.**
    ```sql
    SELECT DISTINCT Datum FROM Spiel WHERE Liga = 1;
    ```

21. **Welcher Verein hat bisher die meisten Tore geschossen?**
    ```sql
    SELECT Name
    FROM Verein
    WHERE V_ID = (SELECT Heim FROM Spiel WHERE Tore_Heim >= ALL(SELECT Tore_Heim FROM Spiel) 
                  UNION 
                  SELECT Gast FROM Spiel WHERE Tore_Gast >= ALL(SELECT Tore_Gast FROM Spiel));
    ```

22. **Wie viele Tore sind bisher in jeder Liga gefallen?**
    ```sql
    SELECT Liga, SUM(Tore_Heim + Tore_Gast) AS Tore
    FROM Spiel
    JOIN Verein AS HeimV ON Spiel.Heim = HeimV.V_ID
    JOIN Verein AS GastV ON Spiel.Gast = GastV.V_ID
    GROUP BY Liga;
    ```

23. **Zeige an, welche brasilianischen Spieler, die für Vereine der ersten Liga spielen, bisher an wie vielen Spielen teilgenommen haben. Gib außerdem die Anzahl ihrer Tore und Vorlagen und den Namen des Vereins aus, für den sie spielen.**
    ```sql
    -- Zuerst herausfinden, welche Abkürzung für Brasilien steht
    SELECT DISTINCT Land FROM Spieler WHERE Land LIKE '%Bra%';
    -- Dann die Abfrage ausführen
    SELECT Spieler.Spieler_Name, Spieler.Spiele, Spieler.Tore, Spieler.Vorlagen, Verein.Name
    FROM Spieler
    JOIN Verein ON Spieler.Vereins_ID = Verein.V_ID
    WHERE Spieler.Land = 'BR' AND Verein.Liga = 1;
    ```

24. **Gib Trikotnummer, Name und die Anzahl der Tore aller Spieler der zweiten Liga, die bisher schon mehr als 10 Tore geschossen haben, geordnet nach der Anzahl ihrer Tore aus.**
    ```sql
    SELECT Trikot_Nr, Spieler_Name, Tore
    FROM Spieler
    JOIN Verein ON Spieler.Vereins_ID = Verein.V_ID
    WHERE Verein.Liga = 2 AND Tore > 10
    ORDER BY Tore DESC;
    ```

25. **Welche Vereine haben bisher gegen den Verein mit der V_ID 10 gewonnen? Wie lauteten die Ergebnisse dieser Spiele?**
    ```sql
    SELECT HeimVerein.Name AS Heim, GastVerein.Name AS Gast, Spiel.Tore_Heim, Spiel.Tore_Gast
    FROM Spiel
    JOIN Verein AS HeimVerein ON Spiel.Heim = HeimVerein.V_ID
    JOIN Verein AS GastVerein ON Spiel.Gast = GastVerein.V_ID
    WHERE (Gast = 10 AND Tore_Heim > Tore_Gast)
       OR (Heim = 10 AND Tore_Gast > Tore_Heim);
    ```

26. **Welcher Spieler hat bisher für den „1. FC Nürnberg“ die meisten Tore geschossen?**
    ```sql
    SELECT Spieler_Name, MAX(Tore)
    FROM Spieler
    WHERE Vereins_ID = (SELECT V_ID FROM Verein WHERE Name = '1. FC Nürnberg');
    ```

27. **Welche Vereine haben am ersten Spieltag der ersten Liga gegeneinander gespielt, wie lauten die Ergebnisse?**
    ```sql
    SELECT HeimVerein.Name AS Heim, GastVerein.Name AS Gast, Spiel.Tore_Heim, Spiel.Tore_Gast
    FROM Spiel
    JOIN Verein AS HeimVerein ON Spiel.Heim = HeimVerein.V_ID
    JOIN Verein AS GastVerein ON Spiel.Gast = GastVerein.V_ID
    WHERE Spieltag = 1 AND HeimVerein.Liga = 1;
    ```

28. **Gegen welche Vereine hat der „FC Schalke 04“ bisher Auswärtsspiele bestritten?**
    ```sql
    SELECT Gast

Verein.Name
    FROM Spiel
    JOIN Verein AS GastVerein ON Spiel.Gast = GastVerein.V_ID
    WHERE Spiel.Heim = (SELECT V_ID FROM Verein WHERE Name = 'FC Schalke 04');
    ```

29. **Wie viele Spiele hat „Hannover 96“ bis heute gewonnen?**
    ```sql
    SELECT COUNT(*)
    FROM Spiel
    WHERE (Heim = (SELECT V_ID FROM Verein WHERE Name = 'Hannover 96') AND Tore_Heim > Tore_Gast)
       OR (Gast = (SELECT V_ID FROM Verein WHERE Name = 'Hannover 96') AND Tore_Gast > Tore_Heim);
    ```

30. **Welche Vereine (Name, Liga) haben bisher schon mindestens fünfmal unentschieden gespielt? Ordne das Ergebnis aufsteigend nach der Liga und absteigend nach der Zahl der Unentschieden.**
    ```sql
    SELECT Verein.Name, Verein.Liga, COUNT(*) AS Unentschieden
    FROM Spiel
    JOIN Verein ON Spiel.Heim = Verein.V_ID OR Spiel.Gast = Verein.V_ID
    WHERE Tore_Heim = Tore_Gast
    GROUP BY Verein.Name, Verein.Liga
    HAVING COUNT(*) >= 5
    ORDER BY Verein.Liga ASC, Unentschieden DESC;
    ```

31. **Gesucht sind Vereinsname, Spieler_ID, Trikotnummer und Name aller Spieler, die für den Verein spielen, der in dieser Saison die meisten Niederlagen erlitten hat (auch mehrere Vereine mit gleicher Anzahl möglich).**
    ```sql
    -- Verein mit den meisten Niederlagen ermitteln
    SELECT Verein.Name, COUNT(*) AS Niederlagen
    FROM Spiel
    JOIN Verein ON Spiel.Heim = Verein.V_ID OR Spiel.Gast = Verein.V_ID
    WHERE (Tore_Heim < Tore_Gast AND Spiel.Heim = Verein.V_ID)
       OR (Tore_Gast < Tore_Heim AND Spiel.Gast = Verein.V_ID)
    GROUP BY Verein.Name
    HAVING COUNT(*) >= ALL(
        SELECT COUNT(*)
        FROM Spiel
        JOIN Verein ON Spiel.Heim = Verein.V_ID OR Spiel.Gast = Verein.V_ID
        WHERE (Tore_Heim < Tore_Gast AND Spiel.Heim = Verein.V_ID)
           OR (Tore_Gast < Tore_Heim AND Spiel.Gast = Verein.V_ID)
        GROUP BY Verein.Name
    );

    -- Spieler des Vereins mit den meisten Niederlagen ermitteln
    SELECT Spieler.Spieler_ID, Spieler.Trikot_Nr, Spieler.Spieler_Name, Verein.Name
    FROM Spieler
    JOIN Verein ON Spieler.Vereins_ID = Verein.V_ID
    WHERE Verein.Name = (SELECT Name FROM (
        SELECT Verein.Name, COUNT(*) AS Niederlagen
        FROM Spiel
        JOIN Verein ON Spiel.Heim = Verein.V_ID OR Spiel.Gast = Verein.V_ID
        WHERE (Tore_Heim < Tore_Gast AND Spiel.Heim = Verein.V_ID)
           OR (Tore_Gast < Tore_Heim AND Spiel.Gast = Verein.V_ID)
        GROUP BY Verein.Name
        HAVING COUNT(*) >= ALL(
            SELECT COUNT(*)
            FROM Spiel
            JOIN Verein ON Spiel.Heim = Verein.V_ID OR Spiel.Gast = Verein.V_ID
            WHERE (Tore_Heim < Tore_Gast AND Spiel.Heim = Verein.V_ID)
               OR (Tore_Gast < Tore_Heim AND Spiel.Gast = Verein.V_ID)
            GROUP BY Verein.Name
        )
    ) AS NiederlageVerein);
    ```

32. **Gib die aktuelle Spieltabelle der 1. Bundesliga aus. Diese beinhaltet für jeden Verein: Den Vereinsnamen, die Anzahl der bisher gespielten Spiele, die Anzahl der Siege, Unentschieden und Niederlagen, die geschossenen und erhaltenen Tore, die Tordifferenz und die Anzahl der Punkte.**
    ```sql
    SELECT Verein.Name,
           COUNT(Spiel.Spiel_ID) AS Spiele,
           SUM(CASE WHEN Spiel.Tore_Heim > Spiel.Tore_Gast THEN 1 ELSE 0 END) AS Siege,
           SUM(CASE WHEN Spiel.Tore_Heim = Spiel.Tore_Gast THEN 1 ELSE 0 END) AS Unentschieden,
           SUM(CASE WHEN Spiel.Tore_Heim < Spiel.Tore_Gast THEN 1 ELSE 0 END) AS Niederlagen,
           SUM(Spiel.Tore_Heim) AS Geschossene_Tore,
           SUM(Spiel.Tore_Gast) AS Erhaltene_Tore,
           (SUM(Spiel.Tore_Heim) - SUM(Spiel.Tore_Gast)) AS Tordifferenz,
           (SUM(CASE WHEN Spiel.Tore_Heim > Spiel.Tore_Gast THEN 3 ELSE 0 END) +
            SUM(CASE WHEN Spiel.Tore_Heim = Spiel.Tore_Gast THEN 1 ELSE 0 END)) AS Punkte
    FROM Spiel
    JOIN Verein ON Spiel.Heim = Verein.V_ID
    WHERE Verein.Liga = 1
    GROUP BY Verein.Name
    ORDER BY Punkte DESC;
    ```

33. **Denke dir selbst eine interessante Fragestellung zur Datenbank „Bundesliga“ aus, erstelle die passende SQL-Anweisung und teste sie. Tausche die Fragestellung anschließend mit deinem Nachbarn aus und bearbeitet eure Aufgaben gegenseitig.**
    - Beispiel-Fragestellung: **Welche Spieler der 1. Liga haben die meisten Vorlagen geliefert?**
    ```sql
    SELECT Spieler_Name, Verein.Name AS Verein, Vorlagen
    FROM Spieler
    JOIN Verein ON Spieler.Vereins_ID = Verein.V_ID
    WHERE Verein.Liga = 1
    ORDER BY Vorlagen DESC;
    ```

### Einfügen, Ändern und Löschen von Datensätzen

34. **Trage dich selbst als Spieler bei deinem Lieblingsverein ein.**
    ```sql
    INSERT INTO Spieler (Vereins_ID, Trikot_Nr, Spieler_Name, Land, Spiele, Tore, Vorlagen)
    VALUES ((SELECT V_ID FROM Verein WHERE Name = 'Mein Lieblingsverein'), 'DeineTrikotNr', 'DeinName', 'DeinLand', 0, 0, 0);
    ```

35. **Trage in die Tabelle „Liga“ die Daten der Regionalliga Süd ein:**
    ```sql
    INSERT INTO Liga (Liga_Nr, Verband, Erstaustragung, Meister, Rekordspieler, Spiele_Rekordspieler)
    VALUES (4, 'Süddeutscher Fußball-Verband', '1963-08-04', (SELECT V_ID FROM Verein WHERE Name = 'SV Darmstadt 98'), 'Thorsten Bauer', 34);
    ```

36. **Die 3. Liga hat einen neuen Rekordspieler: „Max Mustermann“ mit 222 Spielen. Passe die Tabelle „Liga“ entsprechend an.**
    ```sql
    UPDATE Liga
    SET Rekordspieler = 'Max Mustermann', Spiele_Rekordspieler = 222
    WHERE Liga_Nr = 3;
    ```

37. **Philipp Lahm wechselt zum „1. FC Nürnberg“. Ändere die Tabelle „Spieler“ entsprechend ab.**
    ```sql
    UPDATE Spieler
    SET Vereins_ID = (SELECT V_ID FROM Verein WHERE Name = '1. FC Nürnberg')
    WHERE Spieler_Name = 'Philipp Lahm';
    ```

38. **Was bewirkt die folgende SQL-Anweisung?**
    ```sql
    UPDATE Spiel
    SET Uhrzeit = '15:00:00'
    WHERE (Heim = (SELECT V_ID FROM Verein WHERE Name = 'Hertha B
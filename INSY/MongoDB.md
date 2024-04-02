# MongoShell
starten über den Befehl **mongosh**

1. Alle Datenbanken anzeigen
   ```mongosh
   show dbs
   ```

2. Aktualle Datenbank anzeigen
   ```mongosh
   db
   ```

3. Datenbank verwenden/anlegen<br>
   wird erst angezeigt, wenn auch Daten darin gespeichert worden sind
   ```mongosh
   use tutorial
   ```

4. Datenbank löschen<br>
   es werden alle Daten in der Datenbank gelöscht (Vorsicht: keine Sicherheitsabfrage);
   man sieht auch weiter den Datenbankprompt --> leere Datenbank
   ```mongosh
   db.dropDatabase('tutorial')
   ```

5. Neue Collection anlegen
   ```mongosh
   db.createCollection('products')
   ```

6. Alle Collections anzeigen
   ```mongosh
   show collections
   ```

7. Collection löschen
   ```mongosh
   db.products.drop()
   ```

9. Ein neues Document hinzufügen
   ```mongosh
   db.products.insertOne (
     { 
       name: "Banane", 
       price: 0.99, 
       category: 'Obst',
       views: 16
     }
   )
   ```

10. Mehrere Documents hinzufügen
    ```mongosh
    db.products.insertMany (
      [ 
        { 
          name: "Apfel", 
          price: 0.60, 
          category: 'Obst',
          views: 2
        },
        { 
          name: "Apfel Neu", 
          price: 0.80, 
          category: 'Obst',
          views: 10
        }, 
        { 
          name: "Kiwi", 
          price: 1.19, 
          category: 'Obst',
          views: 0,
          ratings: [
            { user: 'Paul', stars: 4},
            { user: 'Tom', stars: 5},
            { user: 'Max', stars: 3}
          ] 
        }
      ]
    )
    ```

11. Alle Documents aus der Collection anzeigen
    ```mongosh
    db.products.find()
    ```

12. Ergebnisse formatiert
    ```mongosh
    db.products.find().pretty()
    ```

13. Ergebnisse filtern
    ```mongosh
    db.products.find({ name: 'Apfel' })
    ```

14. Ergebnisse sortieren
    ```mongosh
    db.products.find().sort({ name: 1 })
    db.products.find().sort({ name: -1 })
    ```

15. Ergebnisse zählen
    ```mongosh
    db.products.find().count()
    db.products.countDocuments()
    ```

16. Ergebnisse limitieren
    ```mongosh
    db.products.find().limit(2)
    ```

17. Verkettung mehrerer Funktionen
    ```mongosh
    db.products.find().limit(2).sort({ price: 1 })
    ```

18. ForEach Schleife
    ```mongosh
    db.products.find().forEach(function(doc) {
      print("Produkt: " + doc.name)
    })
    ```

19. Ergebnisse nach Größer/Kleiner filtern
    ```mongosh
    db.products.find({ price: { $gt: 1 } })
    db.products.find({ price: { $gte: 0.99 } })
    db.products.find({ price: { $lt: 0.99 } })
    db.products.find({ price: { $lte: 0.99 } })
    ```

20. Feld indexieren
    ```mongosh
    db.products.createIndex(
      { name: 'text' }, 
      { default_language: "german" }
    )
    ```

21. Alle Indexes anzeigen
    ```mongosh
    db.products.getIndexes()
    ```

22. Index löschen
    ```mongosh
    db.products.dropIndex('name_text')
    ```

23. Textsuche
    ```mongosh
    db.products.find({
      $text: {
        $search: "Apfel"
      }
    })
    ```

24. Nur ein Ergebnis
    ```mongosh
    db.products.findOne({ category: 'Obst' })
    ```

25. Ergebnisse gefiltert und mit bestimmten Feldern
    ```mongosh
    db.products.find({ category: 'Obst' }, {
      name: 1,
      price: 1
    })
    ```

26. Alle Ergebnisse mit bestimmten Feldern
    ```mongosh
    db.products.find({}, {
      name: 1,
      price: 1
    })
    ```

27. Alle Ergebnisse ohne bestimmte Felder
    ```mongosh
    db.products.find({}, {
      ratings: 0,
      date: 0
    })
    ```

28. Ein Document aktualisieren
    ```mongosh
    db.products.updateOne({ name: "Banane" },
    {
      $set: { 
        price: 1.29 
      }
    })
    ```

29. Ein Document aktualisieren/hinzufügen
    ```mongosh
    db.products.updateOne({ name: 'Gurke' },
    {
      $set: { 
        price: 0.5 ,
        category: 'Gemüse',
        views: 0
      }
    },
    {
      upsert: true
    })
    ```

30. Viele Documents aktualisieren
    ```mongosh
    db.products.updateMany({ category: "Obst" },
    {
      $set: { 
        price: 0.2 
      }
    })
    ```

31. Einen Wert erhöhen
    ```mongosh
    db.products.updateOne({ name: 'Gurke' },
    {
      $inc: {
        views: 1
      }
    })
    ```

32. Ein Feld umbenennen
    ```mongosh
    db.products.update({ name: 'Gurke' },
    {
      $rename: {
        views: 'likes'
      }
    })
    ```

33. Daten aus Collections verarbeiten
    ```mongosh
    db.products.aggregate([
      {
        $match: { 
          price: { $lt: 0.99 }
        }
      },
      {
        $group: {
          _id: "$category", 
          total_views: { $sum: "$views"}}
      }
    ])
    ```

34. Ein Document löschen
    ```mongosh
    db.products.deleteOne({ name: 'Gurke' })
    ```

35. Viele Documents löschen
    ```mongosh
    db.products.deleteMany({ category: 'Obst' })
    ```

### Performance
- ohne Index
  ```mongosh
  db.products.find({ name: 'Apfel' }).explain("executionStats")
  ```
  --> executionTimeMillis
  --> COLLSCAN --> alle Elemente werden durchsucht
  
- mit Index
  ```mongosh
  db.products.createIndex({name:1})
  db.products.find({ name: 'Apfel' }).explain("executionStats")
  ```
  --> in inputStage "stage": "IXSCAN" --> Verwendung eines Index
  --> executionTimeMillisEstimate ist nahezu 0
  
### Aggregation

```mongosh
db.person.aggregate([ { $match: {gender:"Female"} }, {$project: {_id: "id", first_name:1, last_name:1}} ])
```

Mit Aggregation können Stages aufgebaut werden (Reihenfolge wichtig):
- alle Personen vom Type Female
- auf alle Personen die die erste Stage erfüllen soll die zweite angewandt werden --> Ausgabe der _id, first_name und last_name

## Links
- [https://www.mongodb.com/](https://www.mongodb.com/)
- [https://www.youtube.com/watch?v=jpTNn4zkMKY](https://www.youtube.com/watch?v=jpTNn4zkMKY)
- [https://github.com/ProgrammierenM/mongodb-cheat-sheet](https://github.com/ProgrammierenM/mongodb-cheat-sheet)
- [https://www.youtube.com/watch?v=OyktS0ktXYw&list=PLEYpvDF6qy8ZTUjMcg4WOUYMxQZDpRnBt&index=2](https://www.youtube.com/watch?v=OyktS0ktXYw&list=PLEYpvDF6qy8ZTUjMcg4WOUYMxQZDpRnBt&index=2)
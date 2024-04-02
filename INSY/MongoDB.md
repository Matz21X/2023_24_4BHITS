# Befehle
#INSY 

`use db_name`- erstellt / benutzt Datenbank
`db.students.insertOne({name:"Gandalf", age:6, gpa:4.0})` - Fügt ein Objekt hinzu
`db.students.find().sort({name:1})` - Sortiert Alphabetisch nach Namen (bei -1 umgekehrt)


| **Befehl**                                                                                                                         | **Erklärung**                |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `use db_name`                                                                                                                      | erstellt / benutzt Datenbank |
| `db.students.insertOne({name:"Gandalf", age:6, gpa:4.0})`                                                                          | Fügt ein Objekt hinzu        |
| `db.students.insertMany([{name:"Garfee", age:6, gpa:3.5},{name:"DJ Khaled", age:49, gpa:3.4},{name:"DonPollo", age:40, gpa:3.1}])` | fügt mehrere Objekte hinzu   |
| `db.students.find().sort({name:1})`                                                                                                |                              |
|                                                                                                                                    |                              |

// 1. (Nico Zimmermann) Erzeuge ein neues Array, das alle Todos mit userId = 5 und completed = false beinhaltet
// 2. (Florian Thienel) Erzeuge ein neues Array, das alle Todos mit userId = 2 und completed = true beinhaltet
// 3. (Samir Hamza) Erzeuge ein neues Array, das in allen Todos die userId durch den jeweiligen Namen aus dem user Array ersetzt
// 4. (Matthias Hrbek) Erzeuge ein neues Array, das in allen Todos bei completed "true" mit "done" und "false" mit "open" ersetzt
// 5. (Paul Schwayer) Suche nach dem ersten Todo, das im title mit "nulla" startet
// 6. (Yannik Pollak) Suche nach dem ersten Todo, das im title den Text "tempore" enthält
// 7. (Dominik Platzer) Finde heraus, ob bei allen Todos der title größer als 12 Zeichen ist
// 8. (Konrad Kaminski) Finde heraus, ob es mindestens ein Todo gibt, wo der title mehr als 70 Zeichen hat

const users = ["Lia", "Jim", "Mia", "Tim", "Pia", "Wim", "Bea", "Tom", "Gia", "Sam"];

const fetchData = async () => {
  try {
    const todos = await fetch("https://jsonplaceholder.typicode.com/todos");
    const response = await todos.json();

    // Code here, ersetze die forEach-Loop mit deiner Array-Funktion
    const updatedTodos = response.map(todo => {
      if (todo.completed) {
        return { ...todo, completed: 'done' }
      } else {
        return { ...todo, completed: 'open' }
      }
    });

    console.log(updatedTodos)




    // Print your result here ...
    //console.log(response);
  } catch (error) {
    console.log(error);
  }
};

fetchData();
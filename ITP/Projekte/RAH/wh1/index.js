/*
 * Gesamtpunkte: ? von 11 (3/2/2/4)
 */
console.log("TODO 1: Arrow-Funktion:")
/* Gegeben ist die folgende JavaScript-Funktion evaluate().
 * Schreibe die gleiche Funktion so kurz wie möglich in
 * der Arrow-Funktions-Schreibweise.
 */

function evaluate(cond, x) {
    if (eval(cond))
        console.log("x (= " + x + ") erfüllt Bedingung " + cond);
    else
        console.log("x (= " + x + ") erfüllt Bedingung " + cond + " nicht");
}

// ... und jetzt die Arrow-Funktion von dir:
const evaluateArrow = (cond, x) => {
    if (eval(cond))
        console.log(`x (= ${x}) erfüllt Bedingung ${cond}`);
    else
        console.log(`x (= ${x}) erfüllt Bedingung ${cond} nicht`);
}


// Rufe die Arrow-Funktion mit cond "x > 5" und x gleich 3 auf
// Rufe die Arrow-Funktion mit cond "x > 5" und x gleich 6 auf

evaluateArrow("x > 5", 6);
evaluateArrow("x > 5", 3);





// ------------------------------------------------------------------
console.log("TODO 2: Array-Funktion:")
/* Gegeben ist das folgende Array students.
 * Erzeuge ein neues Array Students mit der filter() Funktion,
 * das alle Studenten mit einem Grade größer gleich 50 und kleiner gleich 75 beinhaltet.
 */
const students = [
    { name: 'Quincy', grade: 41 },
    { name: 'Jason', grade: 84 },
    { name: 'Alexis', grade: 100 },
    { name: 'Sam', grade: 65 },
    { name: 'Katie', grade: 72 }];

// Verwende die filter() Funktion, um middleStudents zu erstellen
let middleStudents = students.filter(student => student.grade >= 50 && student.grade <= 75);

// Gib das Ergebnis aus
console.log(middleStudents);



// ------------------------------------------------------------------
console.log('TODO 3: "Destructure" ein Objekt:');
/* Nachfolgend ist ein Objekt mit verschiedenen Properties aufgebaut.
 * Verwende "Destructuring", um die Variablen vorname, alter und hobby2
 * aus den entsprechenden Properties des Objekts zu befüllen.
 */

const student = {
    name: "Huber",
    id: "230123",
    age: 15,
    classes: {
        class1: "SEW",
        class2: "SYT",
        class3: "NWT"
    }
};

// Hier nochmals die alte Variante ... (bitte nicht ändern)
/*
const schuelerId = student.id;
const alter = student.age;
const hauptfach = student.classes.class1;
*/

// ... und jetzt die "Destructure"-Variante von dir, ent-kommentiere das nachfolgende log zur Kontrolle

const { id: schuelerId, age: alter, classes: { class1: hauptfach } } = student;

console.log(schuelerId, alter, hauptfach); // 230123 15 SEW

// ------------------------------------------------------------------
console.log("TODO 4: Template Literal:");
/* Lege zuerst zwei Variablen cond und x an,
 * die in der folgenden Konsolenausgabe verwendet werden.
 * Passe die Konsolenausgabe dann so an,
 * dass die Template Literal Schreibweise verwendet wird.
 */

const cond = "x>5";
const x = 6;

console.log("x (= " + x + ") erfüllt Bedingung " + cond);
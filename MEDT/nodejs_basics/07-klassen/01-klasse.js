//beispiel eines objekts in js
// pfeilfunktionen haben keinen this-pointer

const person = {
    firstName: 'Eduard',
    lastName: 'Müller',
    getFullName: function () {
        return `${this.firstName} ${this.lastName}`
    }
}

console.log(person.getFullName());

//Klassen

class Person {
    #firstName;
    #lastName;

    constructor(firstName, lastName) {
        this.#firstName = firstName;
        this.#lastName = lastName;
    }

    getFullName() {
        return `${this.#firstName} ${this.#lastName}`
    }
}

const p = new Person('Eduard','Müller');

console.log(person);
console.log(p.getFullName());
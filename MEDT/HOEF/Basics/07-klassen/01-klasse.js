// Beispiel eines Objekts in js
// Pfeilfunktionen haben keinen this-pointer

const person = {
    firstName: 'Eduard',
    lastName: 'Müller',
    getFullName: function (){
        return `${this.firstName} ${this.lastName}`
    }
};

console.log(person.getFullName());

// Klassen

class Person {
    #firstName;
    #lastName;
    constructor(firstName, lastname) {
        this.#firstName = firstName;
        this.#lastName = lastname;
    }

    getFullName(){
        return `${this.#firstName} ${this.#lastName}`
    }

}

const p = new Person('Eduard', 'Müller');

console.log(person)
console.log(p)
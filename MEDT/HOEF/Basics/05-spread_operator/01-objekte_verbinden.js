// Objekt
const address = {
    firstName: "Eduard",
    lastName: "Müller",
    street: "Anton Ehrenfried-Straße",
    houseNr: "10",
    zipCode: "2020",
    city: "Hollabrunn"
};

const contact = {
    firstName: 'Eduard',
    lastName: 'Müller',
    email: 'eduard.mueller@htl-hl.ac.at',
    phone: '+43 2952 3361'
};

// Object.assign
// erster parameter ist das Ziel (wird verändert)
// -> deswegen am bseten leeres Objekt verwenden
const person = Object.assign({}, address, contact);

console.log(person);
console.log(address);
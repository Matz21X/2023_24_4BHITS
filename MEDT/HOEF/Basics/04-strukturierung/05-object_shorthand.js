// Objekt
const address = {
    firstName: "Eduard",
    lastName: "Müller",
    street: "Anton Ehrenfried-Straße",
    houseNr: "10",
    zipCode: "2020",
    city: "Hollabrunn"
};

const { firstName, lastName, street, houseNr, zipCode, city} = address;

// lange Variante
const newAddress = {
    firstName: firstName, 
    lastName: lastName,
    street: street,
    houseNr: houseNr,
    zipCode: zipCode,
    city: city
};

// shorthand
const anotherNewAddress = {
    firstName,
    lastName,
    street,
    houseNr,
    zipCode,
    city
};

console.log(newAddress);
console.log(anotherNewAddress);
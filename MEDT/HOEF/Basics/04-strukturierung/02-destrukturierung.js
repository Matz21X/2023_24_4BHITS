// Objekt

const address = {
    firstName: "Eduard",
    lastName: "Müller",
    street: "Anton Ehrenfried-Straße",
    houseNr: "10",
    zipCode: "2020",
    city: "Hollabrunn"
};

/* Zugriff auf Objekteigenschaften
console.log(address);
console.log(address.firstName);
*/

// Destrukturierung bedeutet den Wert eines Attributes
// auf eine neue Variable zu speichern
// Name muss mit Attributname übereinstimmen
// Reihenfolge ist egal
const {city, firstName, lastName} = address;
console.log(`${firstName} ${lastName} - ${city}`);
// Objekt
const address = {
    firstName: "Eduard",
    lastName: "Müller",
    street: "Anton Ehrenfried-Straße",
    houseNr: "10",
    zipCode: "2020",
    city: "Hollabrunn",
    country: "Austria"
};

function printAddress({firstName, lastName, country = 'Unknown'}){
    console.log(`${firstName} ${lastName} - ${country}`);
}

printAddress(address);
// Objekt

const address = {
  firstName: "Eduard",
  lastName: "Müller",
  street: "Anton Ehrenfried-Straße",
  houseNr: "10",
  zipCode: "2020",
  city: "Hollabrunn",
};

const { city, firstName, lastName, ...rest } = address;
console.log(rest);

function printNumbers(...numbers ) {
    numbers.forEach((x)=> console.log(x));
}

printNumbers();
printNumbers(1, 2, 3);
printNumbers(1, 2, 3, 4, 5, 6, 7, 8, 9);

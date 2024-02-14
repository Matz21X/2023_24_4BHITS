// Objekt
const address = {
  firstName: "Eduard",
  lastName: "Müller",
  street: "Anton Ehrenfried-Straße",
  houseNr: "10",
  zipCode: "2020",
  city: "Hollabrunn",
};

const contact = {
  firstName: "Eduard",
  lastName: "Müller",
  email: "eduard.mueller@htl-hl.ac.at",
  phone: "+43 2952 3361",
};

// Spread Operator: ...
const person = { ...address, ...contact, country: 'Austria' };
console.log(person);

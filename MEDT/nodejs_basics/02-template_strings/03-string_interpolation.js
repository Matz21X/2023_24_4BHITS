// template = vorlage, schablone
//template strings geben eine bestimmte form an
//einfügen von daten (interpolation)
// ->> innerhalb von ${ } kann javascript code stehen

const firstName = 'Eduard';
const lastname = 'Müller';
const street = 'Anton Ehrenfried-Straße';
const houseNr = 10;
const zipCode = 2020;
const city = 'Hollabrunn';

const address = `${firstName} ${lastname}
${street} ${houseNr}
${zipCode} ${city}`;

console.log(address);

console.log(`1+1=${1+1}`);
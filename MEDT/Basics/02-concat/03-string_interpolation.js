// template = Vorlage, Schablone
// template Strings geben eine bestimmte Form an
// Einfügen von Daten (interpolation)
// --> inherhalb von ${ } kann JavaScript Code stehen

/*
    Eduard Müller
    Anton Ehrenfried-Straße 10
    2020 Hollabrunn
 */

const firstName = "Eduard";
const lastName = "Müller";
const streetName = "Anton Ehrenfried-Straße";
const housenumber = "10";
const zipCode = "2020";
const city = "Hollabrunn";

const address = `${firstName} ${lastName}
${streetName} ${housenumber}
${zipCode} ${city}`;

console.log(address);
console.log(`1+1=${1+1}`)
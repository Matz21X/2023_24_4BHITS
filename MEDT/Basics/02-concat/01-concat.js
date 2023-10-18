/*
    Eduard Müller
    Anton Ehrenfried-Straße 10
    2020 Hollabrunn
 */

const address = "Eduard Müller \nAnton Ehrenfried-Straße 10 \n2020 Hollabrunn";

const firstName = "Eduard";
const lastName = "Müller";
const streetName = "Anton Ehrenfried-Straße";
const housenumber = "10";
const zipCode = "2020";
const city = "Hollabrunn";

const line1 = firstName + " " + lastName + "\n";
const line2 = streetName + " " + housenumber + "\n";
const line3 = zipCode + " " + city + "\n";

console.log(line1 + line2 + line3);
// Array
const list = [4, 21, 54];

// Aufgabenstellung: Inhalte des Arrays
// verdoppeln und eine neue Liste erstellen

const listDoubled = list.map(function (x) {
    const result = x * 2;
    return result
});

console.log(listDoubled)

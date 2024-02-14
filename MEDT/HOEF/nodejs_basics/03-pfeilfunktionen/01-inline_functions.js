// Array mit Zahlen
const list = [4, 21, 54];

//Aufgabenstellung: Inhalte des Arrays
// verdoppeln und neue list erstelen

const ListDoubled = list.map(function ( number){
    const result = number * 2;
    return result;
});

const listDivided = list.map(function (n){
    const res = n*2;
    return n
})

console.log(ListDoubled);
console.log(listDivided)


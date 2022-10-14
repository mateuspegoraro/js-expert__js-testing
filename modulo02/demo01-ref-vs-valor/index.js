const {deepStrictEqual} = require('assert')

let counter1 = 0
let counter2 = counter1

counter2++
// o que fizermos no counter2 não interfere no counter1
// counter1: 0
// counter2: 1

const item1 = { counter: 0}
const item2 = item1


// por se tratar de um objeto, o item2 reflete no item1
// item1: {counter: 1}
// item2: {counter: 1}

// Tipo primitivo gera uma cópia em memória
deepStrictEqual(counter1, 0)
deepStrictEqual(counter2, 1)

// Tipo de referencia copia o endereço de memória
// e aponta para o mesmo lugar
item2.counter++
deepStrictEqual(item1, {counter: 1})

item1.counter++
deepStrictEqual(item2, {counter: 2})
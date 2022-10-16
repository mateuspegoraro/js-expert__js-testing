// =============================
// CONVERSÃO IMPLÍCITA
// =============================
console.log("========== CONVERSÃO IMPLÍCITA ==========")

console.log('true + 2 = ', true + 2)
// 3
console.log('true - 2 = ', true - 2)
// -1

console.log("'21' + true =", '21' + true)
//'21true'

console.log("'21' - true =", '21' - true)
// 20

console.log("9999999999999999 = ", 9999999999999999)
// 10000000000000000

console.log("0.1 + 0.2 = ", 0.1 + 0.2)
// 0.30000000000000004

console.log("3 > 2 = ", 3 > 2, "; 2 > 1 = ", 2 > 1, "; 3 > 2 > 1 = ", 3 > 2 > 1)
// 3 > 2 =  true ; 2 > 1 =  true ; 3 > 2 > 1 =  false

console.log("3 > 2 >= 1 = ", 3 > 2 >= 1)
// true

console.log("'21' - -1 = ", '21' - -1)
// 22

console.log('"B" + "a" + + "a" + "a" = ', "B" + "a" + + "a" + "a")
// BaNaNa


// =============================
// CONVERSÃO EXPLÍCITA
// =============================
console.log("========== CONVERSÃO EXPLÍCITA ==========")

console.log('123' === String(123), "explicit conversion to string")
// '123'

console.log(123 + '' === '123', "implicit conversion to string")
// true

if('hello' || 1) {
    console.log('ae!')
}

console.assert('hello' || 123 === 'hello', "|| always returns the first element if both are true!")

console.assert(('hello' && 123) === 123, "&& returns the last element!")



// =============================
// CONVERSÃO DE OBJETOS
// =============================
console.log("========== CONVERSÃO EM OBJETOS ==========")

const item = {
    name: 'mateus',
    age: 30,
    // string: 1º se não for primitivo, chama o valueOf
    toString() {// sobrescrita
        console.log('toString!!')
        return `Name ${item.name}, Age: ${item.age}`
    }, 
    // number: 1º se não for primitivo, chama o toString
    valueOf() {// sobrescrita
        console.log('valueOf!!')
        //return 7
        return { hey: 'go to toString!'}// força a chamada do toString**
    },
    // ele tem prioridade na parada!
    [Symbol.toPrimitive](coercionType) {
        console.log('trying to convert to', coercionType)
        const types = {
            string: JSON.stringify(this),
            number: '0007',
        }
        return types[coercionType] || types.string
    }
}

// console.log('item: ', item + 0) // usa o valueOf
// // Depois de alterar o valueOf: nesse caso vai retornar NaN pois o toString retornou uma string, já que fizemos o valueOf retornar object
// console.log('item: ', Number(item)) // usa o valueOf
// // 7

// console.log('item: ',''.concat(item) )// usa o toString
// console.log('item: ',String(item) )// usa o toString
// // Name mateus, Age: 30

// // depois de adicionar o toPrimitive
// // to string e valueOf são ignorados
// console.log('String', String(item)) 
// console.log('Number', Number(item))
// // chama a conversão default: se não é number nem string, é boolean
// console.log('Date', new Date(item))

// testando o toPrimitive
console.assert(item + 0 === '{"name":"mateus","age":30}0')
//console.log('!!item is true?', !!item)
console.assert(!!item)
console.assert('Ae'.concat(item) === 'Ae{"name":"mateus","age":30}')
//console.log('implicit + explicit coercion (using ==)', item == String(item))
console.assert(item == String(item))

const item2 = {...item, name: "Zézin", age: 20}
//console.log('New Object', item2)
console.assert(item2.name === 'Zézin' && item2.age === 20)

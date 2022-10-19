const assert = require('assert');
const obj = {}
const arr = []
const fn = () => {}

// =============================
// Entendendo prototype
// =============================
console.log('-------- Entendendo prototype')

// internamente, objetos literais viram funções explícitas
console.log('new Object() is {}? ', new Object().__proto__ === {}.__proto__)
assert.deepStrictEqual(new Object().__proto__, {}.__proto__)

// __proto__ é a referencia do objeto que possui as propriedades nele
console.log('obj.__proto__ === Object.prototype', obj.__proto__ === Object.prototype)
assert.deepStrictEqual(obj.__proto__, Object.prototype)

console.log('arr.__proto__ === Array.prototype', arr.__proto__ === Array.prototype)
assert.deepStrictEqual(arr.__proto__, Array.prototype)

console.log('fn.__proto__ === Function.prototype', fn.__proto__ === Function.prototype)
assert.deepStrictEqual(fn.__proto__, Function.prototype)

// o __proto__ de Object.prototype é null
console.log('obj.__proto__.__proto__ === null', obj.__proto__.__proto__ === null)
assert.deepStrictEqual(obj.__proto__.__proto__, null)


// =============================
// Aplicando herança com prototype
// =============================
console.log('-------- Aplicando herança com prototype')

function Employee(){}
Employee.prototype.salary = () => "salary**"

function Supervisor(){}
// Aplicando herança com prototype
Supervisor.prototype = Object.create(Employee.prototype)
//console.log(Supervisor.prototype.salary())
Supervisor.prototype.profitShare = () => "profitShare**"

function Manager(){}
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonuses = () => "monthlyBonuses**"

// podemos chamar via prototype mas se chamar direto dá erro!
// pois o ciclo de vida é um pouco diferente
console.log('Manager.prototype.salary()', Manager.prototype.salary())
try {
    console.log('Manager.salary()', Manager.salary())
} catch (error) {
    console.log('Não é possível chamar diretamente Manager.salary(), sem usar o "prototype"!')
}

// Se não chamar o 'new', o primeiro __proto__ vai ser sempre a instância de Function, sem herdar.
// Para acessar as classes sem o new, pode acessar direto via prototype
console.log("Manager.prototype.__proto__ === Supervisor.prototype", Manager.prototype.__proto__ === Supervisor.prototype)
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype)

console.log('--------')
// quando chamamos o 'new', o __proto__ recebe o prototype
console.log('__proto__ = Employee => manager.__proto__: %s, manager.salary(): %s',new Manager().__proto__, new Manager().salary())
console.log('__proto__ = Function => Manager.__proto__: %s',Manager.__proto__)

console.log('Supervisor.prototype (%s) === new Manager().__proto__.__proto__', Supervisor.prototype, Supervisor.prototype === new Manager().__proto__.__proto__)
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__)

console.log('--------')

const manager = new Manager()
console.log('manager.salary()', manager.salary())
console.log('manager.profitShare()', manager.profitShare())
console.log('manager.monthlyBonuses()', manager.monthlyBonuses())

assert.deepStrictEqual(manager.__proto__, Manager.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null)

console.log('manager.__proto__ =>', manager.__proto__)
console.log('manager.__proto__.__proto__ =>', manager.__proto__.__proto__)
console.log('manager.__proto__.__proto__ =>', manager.__proto__.__proto__)
console.log('manager.__proto__.__proto__.__proto__.__proto__ =>', manager.__proto__.__proto__.__proto__.__proto__)
console.log('manager.__proto__.__proto__.__proto__.__proto__.__proto__ =>', manager.__proto__.__proto__.__proto__.__proto__.__proto__)

console.log('--------')

class T1 {
    ping() {return 'ping'}
}

class T2 extends T1 {
    pong() {return 'pong'}
}

class T3 extends T2 {
    shoot(){ return 'shoot'}
}

const t3 = new T3()
console.log('t3 inherits null?')
console.log('t3.__proto__', t3.__proto__)
console.log('t3.__proto__.__proto__', t3.__proto__.__proto__)
console.log('t3.__proto__.__proto__.__proto__', t3.__proto__.__proto__.__proto__)
console.log('t3.__proto__.__proto__.__proto__.__proto__', t3.__proto__.__proto__.__proto__.__proto__)
console.log('t3.__proto__.__proto__.__proto__.__proto__.__proto__', t3.__proto__.__proto__.__proto__.__proto__.__proto__)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null)

assert.deepStrictEqual(t3.__proto__, T3.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null)
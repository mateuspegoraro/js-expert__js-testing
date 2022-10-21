'use-strict';

const {watch, promises: {readFile}} = require('fs')

class File {
    watch(event, filename) {
        console.log('this', this)
        console.log('arguments', Array.prototype.slice.call(arguments))
        this.showContent(filename)
    }

    async showContent(filename) {
        console.log((await readFile(filename)).toString())
    }
}

// watch(__filename, async (event, filename) => {
//     console.log((await readFile(filename)).toString())
// })


const file = new File()
// dessa forma ele ignora o this da classe File e usa o this da função watch lá de dentro
// por isso nao vai encontrar o this.showContent e vai dar erro!
// watch(__filename, file.watch)

// usar arrow function é uma alternativa para não herdar o this da função. MAS FICA FEIO!
// watch(__filename, (event, filename) => file.watch(event, filename))

// uma forma melhor é usar o bind passando por parametro quem você quer que seja o contexto do this;
// O bind retorna uma função com o 'this' que se mantém de file, ignorando o watch
// watch(__filename, file.watch.bind(file))

// E temos o call, nesse exemplo estamos simulando o stub do sinon usando o call
//file.watch.call({ showContent: () => console.log('call: hey sinon!') }, null, __filename)
// O apply faz a mesma coisa que o call, a diferença é que ele recebe um array no final
file.watch.call({ showContent: () => console.log('call: hey sinon!') }, [null, __filename])


import database from './../database.json'
import Person from './person.js'
import { save } from './repository.js'
import TerminalController from './terminalController.js'


const DEFAULT_LANG = "pt-BR"
const STOP_TERM = ":q"

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
    try{
        const answer = await terminalController.question() //3 Lancha,Avião 3000 2022-01-01 2022-10-01
        
        if(answer === STOP_TERM){
            terminalController.closeTerminal()
            console.log('process finished!')
            return;
        }
        const person = Person.generateInstanceFromString(answer)
        terminalController.updateTable(person.formatted(DEFAULT_LANG))
        await save(person)
        return mainLoop()

    } catch (error){
        console.log('DEU RUIM**', error)
        return mainLoop()
    }
}

await mainLoop()
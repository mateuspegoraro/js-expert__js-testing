const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual  } = require('assert');

(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fourItens-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/threeItens-valid.csv'
        const result = await File.csvToJson(filePath)
        const expected = [
            {
                "id": 123,
                "name": "Mateus Pegoraro",
                "profession": "Developer",
                "birthDay": 1992
            },
            {
                "id": 321,
                "name": "Luva de Pedreiro",
                "profession": "Melhor do mundo",
                "birthDay": 1997
            },
            {
                "id": 231,
                "name": "Neymar",
                "profession": "Jogador",
                "birthDay": 1992
            }
        ]

        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }

})()
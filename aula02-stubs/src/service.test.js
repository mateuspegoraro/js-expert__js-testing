const Service = require('./service')
const sinon = require('sinon')
const { deepStrictEqual } = require('assert')


// const BASE_URL_STARWARS = 'https://swapi.dev/api/planets/1'

const BASE_URL_1 = 'https://the-one-api.dev/v2/character?name=Gandalf'
const BASE_URL_2 = 'https://the-one-api.dev/v2/character?name=Frodo Baggins'
const BASE_URL_3 = 'https://the-one-api.dev/v2/character?name=Aragorn II Elessar'

const HEADERS = { headers: { 'Authorization': 'Bearer Z9yvAVOevXk5dIYiKwnh' } }

const mocks = {
    gandalf: require('./mocks/lotCharacters.json'),
    frodo: require('./mocks/lotCharacters2.json'),
    aragorn: require('./mocks/lotCharacters3.json')
}

    ; (async () => {
        // vai pra internet
        // const service = new Service()
        // const withoutStub = await service.makeRequest(BASE_URL_3, HEADERS)
        // console.log(JSON.stringify(withoutStub))

        const service = new Service()
        const stub = sinon.stub(service, 'makeRequest')

        stub.withArgs(BASE_URL_1).resolves(mocks.gandalf)
        stub.withArgs(BASE_URL_2).resolves(mocks.frodo)
        stub.withArgs(BASE_URL_3).resolves(mocks.aragorn)

        {
            const expected = {
                'name': 'Gandalf',
                'race': 'Maiar',
                'hair': 'Grey, later white',
                'birth': 'Before the the Shaping of Arda',
                'death': 'January 253019 ,Battle of the Peak immortal'
            }
            const response = await service.getCharacters(BASE_URL_1, HEADERS)
            deepStrictEqual(response, expected)
        }

        {
            const expected = {
                'name': 'Frodo Baggins',
                'race': 'Hobbit',
                'hair': 'Brown',
                'birth': '22 September ,TA 2968',
                'death': 'Unknown (Last sighting ,September 29 ,3021,) (,SR 1421,)'
            }

            const response = await service.getCharacters(BASE_URL_2, HEADERS)
            deepStrictEqual(response, expected)
        }

    })()
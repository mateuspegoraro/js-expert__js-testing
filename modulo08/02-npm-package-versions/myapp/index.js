// Para importar do diretório use esse comando abaixo no package.json
// node --experimental-specifier-resolution=node index.js
// import FluentSQLBuilder from "../fluentsql-jest-tdd-yt";

import FluentSQLBuilder from "@mateus.pegoraro/fluentsql";
import database from './database/data.json'

const result = FluentSQLBuilder.for(database)
                        .where({ registered: /^2020|2019/ })
                        .select(['category'])
                        .limit(3)
                        .countBy('category')
                        .build()

console.log({ result })
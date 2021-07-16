const generateUniqueId =  require('../utils/generateUniqueId')

//const crypto        = require('crypto') //- cria letras aleatórias
const connection    = require('../database/connection') //- conexão com o DB

module.exports = {

    async create(request, response) { //-cadastrar ONGs

        const { name, email, whatsapp, city, uf } = request.body

        const id = generateUniqueId() //- cria um ID aleatório através do método crypto, com 4 caracteres sendo HEXdecimal.
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        return response.json({ id })
    },



    async index(request, response) { //- Listar ONGs cadastradas

        const ongs = await connection('ongs').select('*')
    
        return response.json(ongs)
    },

}
const connection = require('../database/connection')

module.exports = {

    async create(request, response) { //-cadastrar Incidentes (casos)
        const { title, description, value } = request.body //- "request.body" corpo da requisição
        const ong_id = request.headers.authorization

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })
        return response.json({ id })
    },


    async index(request, response) { //- Listar Incidentes cadastrados

        const [count] = await connection('incidents') //-contador de itens cadastrados
            .count()

        const { page = 1 } = request.query
        
        const incidents = await connection('incidents') //- esqma de paginação para mostrar apenas 5 results por pagina
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //- busca os dados da ong tambem
            .limit(5)
            .offset((page - 1) * 5)
            .select([ //- selecionando os dados incidents e ongs
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf',
            ])

        response.header('X-Total-Count', count['count(*)']) //- "request.header" cabeçalho da requisição

        return response.json(incidents)
        
    },

    async delete(request, response){ //- Deletar Incidentes cadastrados
        const { id } = request.params
        const ong_id = request.headers.authorization

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()
        
        if (incident.ong_id !== ong_id){
            return response.status(401).json({ error: 'Operação não permitida'})
        } 
        
        await connection('incidents').where('id', id).delete()

        return response.status(204).send()
    }
}
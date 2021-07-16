// - Criação de rotas do app
const express = require('express')

const { celebrate, Segments, Joi } = require('celebrate')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/sessions', SessionController.create) //- rota criar Seção Login


routes.post('/ongs', celebrate({ //- rota criar ongs
    [Segments.BODY]: Joi.object().keys({ //- validação de campos
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create)  

routes.get('/ongs', OngController.index)    //- rota listar ongs

routes.post('/incidents', IncidentController.create)        //- rota criar incidentes

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(), //- verifica se a paginação solicitada é um número
    })
}) , IncidentController.index)          //- rota listar incidentes

routes.delete('/incidents/:id', celebrate({ //- rota deletar incidentes
    [Segments.PARAMS]: Joi.object().keys({ //- verifica se o ID da ONG existe para deletar um incident
        id: Joi.number().required(),
    })
}) , IncidentController.delete) 

routes.get('/profile', celebrate({ //- rota listar incidentes de uma determinada ONG 
    [Segments.HEADERS]: Joi.object({ //- verifica se o ID da ONG existe
        authorization: Joi.string().required(),
    }).unknown(),
}) , ProfileController.index) 

module.exports = routes


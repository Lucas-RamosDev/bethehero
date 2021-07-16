const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll( async () => {
        connection.destroy()
    })

    it('should bo able to create a new ONG', async () =>{
        const response = await request(app)
            .post('/ongs')
            .send({
                name    : "APAD",
                email   : "contato@test.com",
                whatsapp: "15987664141",
                city    : "Rio de Janeiro",
                uf      : "RJ"
            })

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})
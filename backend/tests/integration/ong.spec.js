const req = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {    
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    //CREATE ONG
    it('should be able to create a new ONG', async () => {
        const res = await req(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "contato@gmail.com",
                whatsapp: "+5511999999999",
                city: "São Paulo",
                uf: "SP"	
            });

        expect(res.body).toHaveProperty('id');
        expect(res.body.id).toHaveLength(8);
    });

    //LIST ALL ONGS
    it('should list all ONGs in database', async () => {
        await req(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "contato@gmail.com",
                whatsapp: "+5511999999999",
                city: "São Paulo",
                uf: "SP"	
            });        

        const res = await req(app).get('/ongs');        

        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('name');
        expect(res.body[0]).toHaveProperty('email');
        expect(res.body[0]).toHaveProperty('whatsapp');
        expect(res.body[0]).toHaveProperty('city');
        expect(res.body[0]).toHaveProperty('uf');
    })
})
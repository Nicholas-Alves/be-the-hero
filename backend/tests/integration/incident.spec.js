const req = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Incident', () => {    
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });
    
    afterAll(async () => {
        await connection.destroy();
    });

    //LIST INCIDENTS
    it('should list incidents according to page number', async () => {
        let res = await req(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "contato@gmail.com",
                whatsapp: "+5511999999999",
                city: "São Paulo",
                uf: "SP"	
            });

        const { id } = res.body;
        
        await req(app)
            .post('/incidents')
            .set('authorization', id)
            .send({
                title: "Caso Teste",
	            description: "Detalhes do caso teste",
	            value: "150"
            });
        
        
        res = await req(app).get('/incidents');

        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('title');
        expect(res.body[0]).toHaveProperty('description');
        expect(res.body[0]).toHaveProperty('value');
        expect(res.body[0]).toHaveProperty('ong_id');
        expect(res.body[0]).toHaveProperty('name');
        expect(res.body[0]).toHaveProperty('email');
        expect(res.body[0]).toHaveProperty('whatsapp');
        expect(res.body[0]).toHaveProperty('city');
        expect(res.body[0]).toHaveProperty('uf');            
    });

    //CREATE INCIDENT
    it('should be able to create a new Incident', async () => {
        let res = await req(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "contato@gmail.com",
                whatsapp: "+5511999999999",
                city: "São Paulo",
                uf: "SP"	
            });

        const { id } = res.body;
        
        res = await req(app)
            .post('/incidents')
            .set('authorization', id)
            .send({
                title: "Caso Teste",
	            description: "Detalhes do caso teste",
	            value: "150"
            });

        expect(res.body).toHaveProperty('id');
    });

    //DELETE INCIDENT
    it('should de able to delete an incident', async () => {
        let res = await req(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "contato@gmail.com",
                whatsapp: "+5511999999999",
                city: "São Paulo",
                uf: "SP"	
            });

        const ong_id = res.body.id;
        
        res = await req(app)
            .post('/incidents')
            .set('authorization', ong_id)
            .send({
                title: "Caso Teste",
	            description: "Detalhes do caso teste",
	            value: "150"
            });
        
        const { id } = res.body;

        res = await req(app)
            .delete(`/incidents/${id}`)
            .set('authorization', ong_id)
        
        expect(res).toHaveProperty('statusCode');
        expect(res.statusCode).toBe(204);
    })
})
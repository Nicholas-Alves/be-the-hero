const connection = require('../database/connection');

module.exports = {
    async index (req, res){
        const { page = 1 } = req.query;

        const [count] = await connection('incident').count();
        
        const incidents = await connection('incident')
            .join('ong', 'ong.id', '=', 'incident.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incident.*',
                'ong.name',
                'ong.email',
                'ong.whatsapp',
                'ong.city',
                'ong.uf'
            ]);
        
        res.header('X-Total-Count', count['count(*)']);
        return res.json(incidents);
    },
    
    async create (req, res){
        const { title, description, value } = req.body; //ID do Incident
        const ong_id = req.headers.authorization; //ID da ONG logada

        const [id] = await connection('incident').insert({
            title,
            description,
            value,
            ong_id
        })

        return res.json({ id });
    },

    async delete (req, res){
        const { id } = req.params; //ID do Incident
        const ong_id = req.headers.authorization; //ID da ONG logada

        const incident = await connection('incident').where('id', id).select('ong_id').first();

        console.log(incident);
        
        if(incident.ong_id != ong_id) return res.status(401).json({ error: 'Operation not permited.' });
        
        await connection('incident').where('id', id).delete();

        return res.status(204).send();
    }
}
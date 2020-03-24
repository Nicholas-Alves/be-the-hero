
exports.up = function(knex) {
    return knex.schema.createTable('incident', function(table){
        //Primary Key
        table.increments();

        //Attributes
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        //Foreign Key
        table.string('ong_id').notNullable();

        //Relationship
        table.foreign('ong_id').references('id').inTable('ong');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incident');
};


exports.up = function(knex) {
  return knex.schema.createTable('ong', function(table){
    //Primary Key
    table.string('id').primary();

    //Attributes
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ong');
};

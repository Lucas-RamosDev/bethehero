//- criando tabelas no db

exports.up = function(knex) { //- oque eu quero que seja feito
    return knex.schema.createTable('ongs', function (table){

        table.string('id').primary()
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.string('whatsapp').notNullable()
        table.string('city ').notNullable()
        table.string('uf', 2).notNullable()

    })
};

exports.down = function(knex) { //- Neste caso desfazer (deletar) a tabela criada, caso de algum erro
    return knex.schema.dropTable('ongs')
};

/* - Depois de realizar os comandos acima para realizar a criação da tabela
     digitar o seguinte comando no terminal para realziar a criação da talbela:
     "npx knex migrate:latest"
*/
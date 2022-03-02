exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments()
    tbl.string('vin', 16).unique().notNullable()
    tbl.string('make', 128).notNullable()
    tbl.string('model', 128).notNullable()
    tbl.integer('milage', 128).notNullable().unsigned()
    tbl.string('transmition', 128)
    tbl.string('title',128)
  })

};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars')
};


// The critical information for each car is the vin, make, model, and mileage. They also track transmission type (manual, automatic...) and status of the title (clean, salvage...),
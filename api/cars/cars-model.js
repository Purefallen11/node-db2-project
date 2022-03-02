const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = async (id) => {
  return db('cars').where("id", id).first()
}

const create = (newCar) => {
  return db('cars').insert(newCar)
    .then(([id]) => {
      return getById(id)
    })
  
}

module.exports = {
  getAll,
  getById,
  create
}
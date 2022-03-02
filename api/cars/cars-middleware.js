const carsModel = require('./cars-model')

const checkCarId = async (req, res, next) => {
  try {
    const { id } = req.params
    const cars = await carsModel.getById(id)
    if (!cars) {
      res.status(404).json(`car with id ${id} not found`)
    } else {
      req.cars = cars
      next()
    }
  } catch (err) {
    res.status(500).json('there was an error retrieving your car')
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

module.exports = {
  checkCarId
}
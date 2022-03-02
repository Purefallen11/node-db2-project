const carsModel = require('./cars-model')
const vinValidator = require('vin-validator')

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

const checkCarPayload = async (req, res, next) => {
  try {
    const car = req.body
    if (!car.vin) {
      res.status(400).json('vin is required')
    } else if (!car.make) {
      res.status(400).json('make is required')
    } else if (!car.model) {
      res.status(400).json('model is required')
    } else if (!car.mileage) {
      res.status(400).json('mileage is required')
    } else {
      req.newCar = car
      next()
    }
  } catch (err) {
    next(err)
  }
}

const checkVinNumberValid = (req, res, next) => {
  const vin = req.body
  const validVin = vinValidator.validate(vin)
  if (!validVin) {
    res.status(400).json(`vin ${vin} is not valid`)
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const vin = req.body
    const uniqueVin = await carsModel.getByVin(vin)
    if (!uniqueVin) {
      res.status(400).json(`vin ${vin} already exists`)
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
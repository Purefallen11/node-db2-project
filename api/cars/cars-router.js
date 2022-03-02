const express = require('express')
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberUnique,
    checkVinNumberValid } = require('./cars-middleware')
const carsModel = require('./cars-model')

const router = express.Router()

router.get('/',async (req, res, next) => {
    try {
        const cars = await carsModel.getAll()
        res.json(cars)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', checkCarId, (req, res, next) => {
    res.status(200).json(req.cars)
    next()
})

router.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid, async (req, res, next) => {
    try {
        const newCar = await carsModel.create(req.newCar)
        res.json(newCar)
    } catch (err) {
        next(err)
    }
})


router.use((err, req, res) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})

module.exports = router
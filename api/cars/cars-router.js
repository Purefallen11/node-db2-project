const express = require('express')
const {checkCarId} = require('./cars-middleware')
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
})


router.use((err, req, res) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})

module.exports = router
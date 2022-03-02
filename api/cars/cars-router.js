const express = require('express')

const carsModel = require('./cars-model')

const router = express.Router()

router.get('/', (req, res) => {
    console.log('this is routers')
})
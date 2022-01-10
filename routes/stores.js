const { getStores, addStore } = require('../controllers/stores')

const router = require('express').Router()

router
    .get('/', getStores)
    .post('/', addStore)

module.exports = router
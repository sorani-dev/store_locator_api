const Store = require('../models/Store')

/**
 * @description Get all stores
 * @route GET /api/v1/stores
 * @access Public
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Function} next 
 * @returns 
 */
module.exports.getStores = async (req, res, next) => {
    try {
        const stores = await Store.find({})

        return res.status(200).json({
            success: true,
            count: stores.length,
            data: stores
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    }
}

/**
 * @description Create a stores
 * @route POST /api/v1/stores
 * @access Public
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Function} next 
 * @returns 
 */
module.exports.addStore = async (req, res, next) => {
    try {
        const store = await Store.create(req.body)

        return res.status(201).json({
            success: true,
            data: store
        })
    } catch (error) {
        console.error(error)
        if (error.code === 11000) {
            return res.status(400).json({ error: 'This store already exists' })
        }
        res.status(500).json({ error: 'Server error' })
    }
}
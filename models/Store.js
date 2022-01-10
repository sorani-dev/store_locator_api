const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')

const StoreSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: [true, 'Please add a store ID'],
        unique: true,
        trim: true,
        maxlength: [10, 'Store ID must less than 10 characters'],
    },
    address: {
        type: String,
        required: [true, 'Please add an address'],
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            // required: true
        },
        coordinates: {
            type: [Number],
            // required: true
            index: '2dsphere',
        },
        formattedAddress: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

StoreSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address)
    console.info(loc)
    console.info(loc[0].formattedAddress)
    let formatted = loc[0].formattedAddress
    if (typeof loc[0].formattedAddress === 'undefined') {
        formatted = `${loc[0].streetNumber !== undefined ? loc[0].streetNumber : ''}${loc[0].streetName} ${loc[0].zipcode} ${loc[0].city} ${loc[0].state} ${loc[0].county}, ${loc[0].country}`
    } else {

    }
    // const formatted = '%n %S %z %c %T, %P, %p'
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: formatted
    }

    // Do not save address
    this.address = undefined;

    next()
})

module.exports = mongoose.model('Store', StoreSchema)

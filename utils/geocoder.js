const NodeGeocoder = require('node-geocoder');

const options = {

}

const geocoder = NodeGeocoder({
    provider: process.env.GEOCODER_PROVIDER,
    email: process.env.GEOCODER_EMAIL,
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null,
    // formatter: 'string',
    // formatterPattern: '%n %S %z %c %T, %P, %p',
    // fetch: function fetch(url, options) {
    //     return fetch(url, {

    //     })
    // }

})

module.exports = geocoder
const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWJoaXNoZWt1Y3MiLCJhIjoiY2s4YnByMnI4MGVuMTNtbzNrbmdwbmJ3YSJ9.sMPFJXNkgObT7Nvpu5nX1Q&limit=1'

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to Internet',undefined)
        } else if(body.features.length === 0){
            callback('Unable to locate. Try another search',undefined)
        } else{
            callback(undefined, {
                Latitude: body.features[0].center[0],
                Longitude: body.features[0].center[1],
                Location: body.features[0].place_name
            })
        }
    })
}

const reverseGeocoding = (latitude, longitude, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + latitude + ',' + longitude +'.json?access_token=pk.eyJ1IjoiYWJoaXNoZWt1Y3MiLCJhIjoiY2s4YnByMnI4MGVuMTNtbzNrbmdwbmJ3YSJ9.sMPFJXNkgObT7Nvpu5nX1Q&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('Unable to connect to Internet',undefined)
        } else if(body.query.length === 0){
            callback('Unable to locate. Try another search',undefined)
        } else{
            callback(undefined, {
                Location: body.features[0].place_name
            })
        }
    })
}

module.exports = {
    geocode,
    reverseGeocoding
}
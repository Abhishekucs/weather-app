const request = require('request')
const forecast = (Longitude, latitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/182e45a7be424441001aa2639a2c36ff/' + latitude + ',' + Longitude + '?units=si'

    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to Internet', undefined)
        } else if(body.error){
            callback('Unable to fetch Location',undefined)
        } else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out.' + 'There is a ' + body.currently.precipProbability * 100 + '% chance of rain' )
        }
    })
}

module.exports = forecast
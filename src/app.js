const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { geocode, reverseGeocoding } = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Path to Public and Views 
const publicPathDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const hbsPath = path.join(__dirname, '../templates/Partials')


app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(hbsPath)

app.use(express.static(publicPathDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abhishek Kumar'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Abhishek Kumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Abhishek Kumar'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address is not provided'
        })
    }
        geocode( req.query.address, (error, {Latitude, Longitude, Location} = {}) => {
            if(error){
                return res.send({
                    error
                })
            }
        
            forecast(Latitude, Longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error
                    })
                }
                
                res.send({
                    Forecast: forecastData,
                    Location,
                    Address: req.query.address
                })
            })
        })
})

app.get('/currentlocation', (req, res) => {
    const Latitude = req.query.latitude
    const Longitude = req.query.longitude

    forecast(Latitude, Longitude, (error, forecastData) => {
        if(error){
            return res.send({
                error
            })
        }
        
        reverseGeocoding(Latitude, Longitude, (error, location) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                Forecast: forecastData,
                Location: location.Location
                // Address: req.query.address
            })
        })  
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Abhishek Kumar',
        text: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhishek Kumar',
        text: 'Page not found'
    })
})
app.listen(port, () => {
    console.log('Server is up and running at ' + port)
})
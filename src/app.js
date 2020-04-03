const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

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
app.listen(3000, () => {
    console.log('Server is up and running!')
})
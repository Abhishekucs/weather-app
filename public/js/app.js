console.log('This file is from public directory')

const weatherForm = document.querySelector('form')
const searchLocation = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const myLocation = document.querySelector('#my-location')
const currentLocation = document.querySelector('#current-location')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchLocation.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = 'Forecast:- ' + data.Forecast
            messageTwo.textContent = 'Location:- ' + data.Location
        }
    })
})
})

currentLocation.addEventListener('submit', (e) => {
    e.preventDefault()

    if(!navigator.geolocation){
        return alert('Browser doesnot support this functionality')
    }

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    navigator.geolocation.getCurrentPosition((location) => {
        const data = {
            latitude : location.coords.latitude,
            longitude : location.coords.longitude
        }

        fetch(`/currentlocation?latitude=${data.longitude}&longitude=${data.latitude}`).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    messageOne.textContent = data.error
                }else{
                    messageOne.textContent = 'Forecast:- ' + data.Forecast
                    messageTwo.textContent = 'Location:- ' + data.Location
                }
            })
        })
        
    })
})
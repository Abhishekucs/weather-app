console.log('This file is from public directory')

const weatherForm = document.querySelector('form')
const searchLocation = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

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
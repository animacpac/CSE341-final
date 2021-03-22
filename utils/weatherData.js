const request = require('request');
const constants = require('../config');

const weatherData = (address, callback) => {
    const url = constants.openWeathermap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeathermap.SECRET_KEY
 

    request({url, json:true}, (error, {body}) =>{
       
        if(error) {
            callback("Can't feach data", undefined)
        }
        else {
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            })
        }
    })
}

module.exports = weatherData;
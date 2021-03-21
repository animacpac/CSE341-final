const request = require('request');
const constants = require('../config');

const weatherData = (address, callback) => {
    const url = constants.openWeathermap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeathermap.SECRET_KEY
    console.log(url);
    callback(true);
}
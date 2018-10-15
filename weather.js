const request = require('request');

const API_KEY = "AIzaSyB8w46DGzixZ-8FlV0W_Gp7P3YZ3a8_vg0";
const DS_KEY = "47d0173be2e6a3864ba8c8def934cced";
const city = process.argv[2];

const debug = true;

const log = (text) => {
    if (debug) {
        console.log(text);
    }
}

const getLocation = (city, key, callback) => {
    request.post(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${key}`,
        (error, response, body) => {
            try {
                log('here1', body);
                const {lat, lng} = JSON.parse(body).results[0].geometry.location;
                callback(null, {lat, lng})
            }catch (error){
                log('here2');
                callback(error)
            }
        }
    );
};

const getWeather = (lat, lng) => {
    request.post(
        `https://api.darksky.net/forecast/${DS_KEY}/${lat},${lng}`,
        (error, response, body) => {
            try {
                log('here3');
                const weather = JSON.parse(body).currently;
                console.log(`
                    TEMPERATURE: ${math.unit(weather.temperature, 'fahrenheit').to('celsius')},
                    WIND SPEED: ${weather.windSpeed}, 
                    HUMIDITY: ${weather.humidity}
                `)
            } catch (error) {
                log('here4');
                console.error(error);
            }
        }
    )
}

getLocation(
    city,
    API_KEY,
    (error, response) => error ? console.log(error) : getWeather(response.lat, response.lng)
)
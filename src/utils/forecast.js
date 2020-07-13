const requset = require('request');

const forecast = (addr, callback) => {
     let url =  'http://api.weatherstack.com/current?access_key=5b26deb039dff77d2cdcd9a883a2adcc&query=' + encodeURIComponent(addr);
     requset( { url, json: true }, (error, { body }) => {
         if (error) {
             return callback("Error: Weather service has unavible now. Try later.", undefined);
             
         } else if ( body.hasOwnProperty('error') ) {
             return callback("Error: Invalid address. Try again", undefined);
             
         } else {
            return callback(undefined, {
                forecast: body.current.temperature,
                location: `${body.location.name}, ${body.location.region}, ${body.location.country}`,
            });
         }
     } );
}

module.exports = forecast;
const geocode = require('./geocode');
const weather = require('./weathercode');

const address = process.argv[2]

geocode(address,(error,{latitude,longitude,location}) => {
    if(!address){
        return console.log("please enter address");
    }
    if(error){
        return console.log(error);
    }
    weather(latitude,longitude,(error,forecastdata)=>{
        if(error){
           return console.log(error);
        }
        console.log(location);
        console.log(forecastdata);
    })
});
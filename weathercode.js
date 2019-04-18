const request = require('request');
const weather = (lat,long,callback) => {
    const url = `https://api.darksky.net/forecast/f472a8ba53cb9fc16da66899106bd42e/${lat},${long}`;
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('check your internet connecttion',undefined);
        } else if(body.code == 400){
            callback('please enter correct place',undefined);
        } else{
            callback(undefined,body.daily.data[0].summary + " " + "Max-Temp: "+body.daily.data[0].temperatureHigh+"f "+" Min-Temp: "+body.daily.data[0].temperatureMin+"f ");
        }
    })
}

module.exports = weather;
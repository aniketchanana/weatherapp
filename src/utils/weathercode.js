const request = require('request');
const weather = (lat,long,loc,callback) => {
    const url = `https://api.darksky.net/forecast/f472a8ba53cb9fc16da66899106bd42e/${lat},${long}`;
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('check your internet connecttion',undefined);
        } else if(body.code == 400){
            callback('please enter correct place',undefined);
        } else{
            callback(undefined,{
                location:loc,
                summary :body.daily.data[0].summary,
                maxtemp : body.daily.data[0].temperatureHigh,
                mintemp : body.daily.data[0].temperatureMin
            });
        }
    })
}

module.exports = weather;



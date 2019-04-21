const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/weathercode');
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname,'../public')));

app.listen(3000,()=>{
    console.log("server is up");
})


app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'aniket'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'weather',
        name:'aniket'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"how can i help you",
        name:"aniket"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"address is not provided",
        })
    }
    geocode(req.query.address,(error,response = null)=>{
        if(error || response === null){
           return res.send({
                error:"cannot find given location"
            })
        }
        forecast(response.latitude,response.longitude,response.location,(error,response)=>{
            if(error){
                return res.send({error});
            }
            res.send(response);
        })
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        error:"helping page not found"
    });
})

app.get('*',(req,res)=>{
    res.render('error',{
        error:"Page not found"
    });
})

const express = require("express");
const weatherFuncs = require("./weather");
const app = express();
const port = process.env.PORT || 8080;
app.set("view engine","ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('weatherPics'));

app.get("/",(req,res)=>{
    weatherFuncs.populateWeatherData().then((data)=>{
        console.log(data);
        res.render('weather',{forecast:data});
    }).catch((err)=>{console.log(err);})
});

app.get("/about",(req,res)=>{
        res.render('about');
});

app.get("/creator",(req,res)=>{
    res.render('creator');
});

app.listen(port, ()=>{
    console.log(`Standing by on ${port}`);
});
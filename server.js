const express = require("express");
const weatherFuncs = require("./weather");
const app = express();
const port = process.env.PORT || 8080;
app.set("view engine","ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/",(req,res)=>{
    res.render('weather');
});

app.listen(port, ()=>{
    console.log(`Standing by on ${port}`);
});
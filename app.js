const express = require("express");
//const mysql = require('mysql');
const app = express();
const path = require('path');
app.set("view engine", "ejs");

//*********************************************************************
/* Configure MySQL DBMS */
//const connection = mysql.createConnection({
   // host: 'localhost',
    //user: 'mart',
   // password: 'mart',
    //database: 'users'
//});
//connection.connect();
//***********************************************************************
app.use("/imgs", express.static(path.join(__dirname, 'imgs')));
app.use("/css", express.static(path.join(__dirname, 'css')));

const request = require('request');

//routes
app.get("/", async function(req, res){

 let parsedData = await getImages();
 
 console.dir("parsedData: " + parsedData); //displays content of the object
    
 res.render("index", {"images":parsedData});

            
}); //root route


app.get("/results", async function(req, res){
    let latitude = req.query.latitude;
    let longitude = req.query.longitude;
    let date = req.query.date;

    res.render("results", {"image": `?lat=${latitude}&lon=${longitude}&date=${date}&cloud_score=FALSE&dim=.15&api_key=${API_KEY}`});
    
});//results route

/* Register Routes */
app.get('/register', function(req, res){
    res.render('register');
});

/*Login Routes */
app.get('/login', function(req, res){
    res.render('login');
});

app.get("/nasa", async function(req, res) {
    let lat = req.query.lat;
    let long = req.query.long;
    let date = req.query.date;

    var req_settings = {
        "url": "https://api.nasa.gov/planetary/earth/imagery",
        "qs": {
            "lat": lat,
            "lon": long,
            "dim": .1,
            "date": date,
            "api_key": "l1gzVpZhiMT8HTOAp6hbolyk8AgfjqvTKQZdxlLa"
        },
        method: 'GET',
        encoding: null
    }

    request(req_settings, function (err, resp, body) {
        if (err) {
            console.log(err);
            return;
        }
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
});

var API_KEY = 'l1gzVpZhiMT8HTOAp6hbolyk8AgfjqvTKQZdxlLa';


function getImages(){   
    return new Promise( function(resolve, reject){
        request('https://api.nasa.gov/planetary/earth/assets?lon=100.75&lat=1.5&date=2020-04-01&dim=0.15&api_key=l1gzVpZhiMT8HTOAp6hbolyk8AgfjqvTKQZdxlLa',
                 function (error, response, body) {
    
            if (!error && response.statusCode == 200  ) { //no issues in the request
                
                 let parsedData = JSON.parse(body); //converts string to JSON
                 
                 resolve(parsedData);
                
                
            } else {
                reject(error);
                console.log(response.statusCode);
                console.log(error);
            }
    
          });//request
   
    });
    
}
// https://api.nasa.gov/planetary/earth/imagery?lon=-95.33&lat=29.78&date=2018-01-01&dim=0.15&api_key=DEMO_KEY

//starting server
//I used port=3000 to use it on my local machine
// process.env.PORT
app.listen(3000, process.env.IP, function(){
    console.log("PORT > " + process.env.PORT );
    console.log("Express server is running...");
})

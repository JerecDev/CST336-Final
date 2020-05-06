const express = require("express");
const mysql = require('mysql');

const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const path = require('path');
const bcrypt = require('bcryptjs');
//*************************************************
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'top secret code!',
    resave: true,
    saveUninitialized: true
}));
//*****************************************************
app.set("view engine", "ejs");

//*********************************************************************
/* Configure MySQL DBMS */
const connection = mysql.createConnection({
    host: 'op2hpcwcbxb1t4z9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'vgud6frw2yoic6eo',
    password: 'jh3w0rrzdnpp4t04',
    database: 'whromll53866cpke'
});
connection.connect();
//***********************************************************************


/* Middleware */
function isAuthenticated(req, res, next){
    if(!req.session.authenticated) res.redirect('/login');
    else next();
}

function checkUsername(username){
    let stmt = 'SELECT * FROM users WHERE username=?';
    return new Promise(function(resolve, reject){
       connection.query(stmt, [username], function(error, results){
           if(error) throw error;
           resolve(results);
       }); 
    });
}

function checkPassword(password, hash){
    return new Promise(function(resolve, reject){
       bcrypt.compare(password, hash, function(error, result){
          if(error) throw error;
          resolve(result);
       }); 
    });
}

function deleteUser(username) {
    return new Promise((resolve, reject) => {
        let stmt = `DELETE FROM users WHERE username='${username}';`;
        connection.query(stmt, function(error, results) {
            if (error) throw error;
            resolve();
        });
    });
}

function logQuery(username, latitude, longitude, date) {
    let stmt = `INSERT INTO queries (username, sub_date, latitude, longitude, date)
     VALUES ('${username}', ${connection.escape(new Date)}, ${latitude}, ${longitude}, '${date}')`;
    console.log(stmt);
    connection.query(stmt, function(error, results){
        if (error) throw error;
    });
}

function getQuerys(username) {
    return new Promise((resolve, reject) => {
        let stmt = `SELECT * FROM queries WHERE username='${username} ' ORDER BY sub_date DESC LIMIT 0, 20;`;
        connection.query(stmt,function(error,results){
            if (error) throw error;
            resolve(results);
        });
    });
}
//**********************************************************************

app.use("/imgs", express.static(path.join(__dirname, 'imgs')));
app.use("/css", express.static(path.join(__dirname, 'css')));

const request = require('request');

//routes
app.get("/", async function(req, res){

 let parsedData = await getImages();
 
 console.dir("parsedData: " + parsedData); //displays content of the object
    
 res.render("index", {
    "images":parsedData, 
    "authed": (req.session.authenticated) ? true : false
});

            
}); //root route


app.get("/results", async function(req, res){
    let latitude = req.query.latitude;
    let longitude = req.query.longitude;
    let date = req.query.date;

    if (req.session.authenticated) {
        logQuery(req.session.user, latitude, longitude, date);
    }

    res.render("results", {"image": `?lat=${latitude}&lon=${longitude}&date=${date}&cloud_score=FALSE&dim=.15&api_key=${API_KEY}`});
    
});//results route

/* Register Routes */
app.get('/register', function(req, res){
    res.render('register');
});

app.post('/register', function(req, res){
    let salt = 10;
    bcrypt.hash(req.body.password, salt, function(error, hash){
        if(error) throw error;
        let stmt = 'INSERT INTO users (username, password) VALUES (?, ?)';
        let data = [req.body.username, hash];
        connection.query(stmt, data, function(error, result){
           if(error) throw error;
           res.redirect('/login');
        });
    });
});

/* Login Routes */
app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', async function(req, res){
    let isUserExist   = await checkUsername(req.body.username);
    let hashedPasswd  = isUserExist.length > 0 ? isUserExist[0].password : '';
    let passwordMatch = await checkPassword(req.body.password, hashedPasswd);
    if(passwordMatch){
        req.session.authenticated = true;
        req.session.user = isUserExist[0].username;
        res.redirect('/welcome');
    }
    else{
        res.render('login', {error: true});
    }
});

/* Logout Route */
app.get('/logout', function(req, res){
   req.session.destroy();
   res.redirect('/');
});

/* Welcome Route */
app.get('/welcome', isAuthenticated, async function(req, res){
    let queries = await getQuerys(req.session.user);

    res.render('welcome', {user: req.session.user, queries: queries}); 
});

/* Delete Route */
app.get('/delete', isAuthenticated,  async function(req, res) {
    let username = req.session.user;
    await deleteUser(username);
    req.session.destroy();
    res.redirect('/');
});

//************************************************

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
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("PORT > " + process.env.PORT );
    console.log("Express server is running...");
})

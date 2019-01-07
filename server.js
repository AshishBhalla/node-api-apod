/**Getting inbuilt modules*/
const fs = require('fs');

//**Getting installed modules  */
const express = require('express');

const hbs = require('hbs');

//**Getting custom modules  */
var data = require('./apiAccess');

var app = express();

app.set('view engine','hbs');

/**Using a middleware to write data in the logs*/
app.use((req,res,next) => {
    var now = new Date().toString();
    var logData = `${now}-${req.method}-${req.url}`
    fs.appendFile('request.logs',logData +'\n', (err) =>{
        if (err){
            console.log('Error writing to the log',err)
        }
        next();
    })
});

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) =>{
    /**NASA api URL*/
    var url = 'https://api.nasa.gov/planetary/apod?api_key=';

    var apiKey = 'DIeKawTYAxPlthbTABhIS26XOr0L9U1vsmFw49SQ';

    var completeURL = url + apiKey;

    data.retData(completeURL, (err, body) => {
        if (err) {
            res.send("Error fetching results", err)
        }
        else {
            // res.send(JSON.stringify(body, undefined, 2));
            res.render('home.hbs',{
                heading: 'Pic of the Day',
                welcomeMsg: body.explanation,
                apod : body.hdurl
            })
        }
    });
});

app.listen(3000, () =>{
    console.log('App running on port 3000!')
});
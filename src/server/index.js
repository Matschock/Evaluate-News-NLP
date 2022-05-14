// added dotnev for envirnoment variable for API key
const dotenv = require('dotenv');
dotenv.config();

//
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

// app.use(express.static('dist'))
app.use(express.static('src/client'))

console.log(__dirname)

// Define environment variable
var textapi = new MeaningCloud({
    application_id: process.env.API_ID,
  });

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

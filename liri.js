require("dotenv").config();
var keys = require("./key.js");
var axios = require("axios");
var fs = require('fs');
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify)
var moment = require('moment')

var command = process.argv[2];
var query = process.argv.slice(3).join(" ");

liriStart(command, query);


function liriStart(service, search) {
    switch (service) {
        case 'movie-this':
            return omdb(search)
        case 'spotify-this-song':
            return song(search)
        case 'concert-this-band':
            return getConcert(search)
        case 'do-what-it-says':
            return readFunc();
    }
}

function song(val) {
    console.log("Running Spotify " + val)
    spotify.search({
        type: 'track',
        query: val
    }, function (err, data) {
        if (err) {
            return console.log('Error: ' + err);
        }
        console.log(data.tracks.items[0]);
    });
}

function omdb(val) {
    let queryUrl = "http://www.omdbapi.com/?t=" + val + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl)
        .then(function (response) {
            console.log(response.data)
        })
}

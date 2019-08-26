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

// liriStart(comand, query)
function liriStart(service, search) {
    // switch (command)
    switch (service) {
        case 'movie-this':
            // return omdb(query)
            return omdb(search)
        case 'spotify-this-song':
            return song(search)
        case 'concert-this-band':
            return getConcert(search)
        case 'do-what-it-says':
            return readFunc();
    }
}
// val === search === query
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

// Requires

require("dotenv").config();
var request = require("request");
var moment = require('moment');
var fs = require("fs");
var keys = require("./keys.js");

// Initialize API's

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var omdb = (keys.omdb);
var bandsintown = (keys.bandsintown);


// Accept user input

var userInput = process.argv[2];
var userQuery = process.argv.slice(3).join(" ");


// Switch

function userCommand(userInput, userQuery) {
    switch (userInput) {
        case "concert-this":
            concertInfo();
            break;
        case "spotify-this-song":
            spotifyInfo();
            break;
        case "movie-this":
            movieInfo();
            break;
        case "do-what-it-says":
            doWhatItSays(userQuery);
            break;
        default:
            console.log("\nCommand not recognized, try: \n concert-this (Artist Name) \n spotify-this-song (Song Name) \n movie-this (Movie Title) \n do-what-it-says");
            break;
    }
}

userCommand(userInput, userQuery);

// Functions

// Concerts

function concertInfo() {
    console.log(`\nSearching bands that relate to: ${userQuery}`);
    request("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=" + bandsintown, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var userBand = JSON.parse(body);
            if (userBand.length > 0) {
                for (i = 0; i < 1; i++) {

                    console.log(`\nThis band is playing!\n\nArtist: ${userBand[i].lineup[0]} \nVenue: ${userBand[i].venue.name}\nVenue Location: ${userBand[i].venue.latitude},${userBand[i].venue.longitude}\nVenue City: ${userBand[i].venue.city}, ${userBand[i].venue.country}`)

                    let concertDate = moment(userBand[i].datetime).format("MM/DD/YYYY hh:00 A");
                    console.log(`Date and Time: ${concertDate}\n`);
                };
            } else {
                console.log('Band or concert not found!');
            };
        };
    });
};

// Spotify

function spotifyInfo() {
    console.log(`\nSearching Spotify for "${userQuery}"`);

    if (!userQuery) {
        userQuery = "the sign ace of base"
    };

    spotify.search({
        type: 'track',
        query: userQuery,
        limit: 1
    }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        var spotifyArr = data.tracks.items;

        for (i = 0; i < spotifyArr.length; i++) {
            console.log(`\nI found this song relating to your search:\n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}`)
        };
    });
}

// Movies

function movieInfo() {
    console.log(`\nGathering info for "${userQuery}"`);
    if (!userQuery) {
        userQuery = "mr nobody";
    };
    request("http://www.omdbapi.com/?t=" + userQuery + "&apikey=86fe999c", function (error, response, body) {
        var userMovie = JSON.parse(body);

        var ratingsArr = userMovie.Ratings;
        if (ratingsArr.length > 2) {}

        if (!error && response.statusCode === 200) {
            console.log(`\nI found this movie relating to your search:\n\nTitle: ${userMovie.Title}\nCast: ${userMovie.Actors}\nReleased: ${userMovie.Year}\nIMDb Rating: ${userMovie.imdbRating}\nRotten Tomatoes Rating: ${userMovie.Ratings[1].Value}\nCountry: ${userMovie.Country}\nLanguage: ${userMovie.Language}\nPlot: ${userMovie.Plot}`)
        } else {
            return console.log("Movie able to be found. Error:" + error)
        };
    })
};

// Random

function doWhatItSays() {
    fs.readFile("../../random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");

        userInput = dataArr[0];
        userQuery = dataArr[1];
                
        userCommand(userInput, userQuery);
    });
};
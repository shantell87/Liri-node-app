require("dotenv").config();

//node packages
const fs = require("fs");
const axios = require("axios");
const keys = require("./keys.js");
const inquirer = require("inquirer");
const moment = require("moment");
const Spotify = require('node-spotify-api');;

function runSearch() {
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "What can Liri help you with?",
            choices: ["movie-this", "concert-this", "spotify-this-song"]
        },
        {
            type: "input",
            message: "What would you like to search?",
            name: "search"
        }
    ]).then(function (userRes) {
        var searchInput = JSON.stringify(userRes.search)
        console.log('Search Results:', userRes.action, searchInput);

        //omdb api request
        const getMovieInfo = async function () {
            var queryUrl = "http://www.omdbapi.com/?t=" + searchInput + "&y=&plot=short&apikey=trilogy";
            try {
                const response = await axios.get(queryUrl);
                console.log(response.data.Title);
                console.log(response.data.Released);
                console.log(response.data.Ratings);
                console.log(response.data.Country);
                console.log(response.data.Language);
                console.log(response.data.Plot);
                console.log(response.data.Actors);
            } catch (e) {
                console.log(e);
            }
        };

        //spotify api
        const getSong = function () {
            const spotify = new Spotify(keys.keys);
            spotify.search({ query: searchInput, type: "track", limit: 1 }, function (error, data) {
                if (error) {
                    console.log(error);
                } var trackArray = data.tracks.items;
                for (i = 0; i < trackArray.length; i++) {
                    console.log("Artist: " + trackArray[i].album.artists[0].name);
                    console.log("Album: " + trackArray[i].album.name);
                    console.log("Song: " + trackArray[i].name);
                    console.log("Song Preview Audio: " + trackArray[i].preview_url)
                }
            });
        };

        //bands in town api request
        const getArtistEvent = async function () {
            var queryConcert = "https://rest.bandsintown.com/artists/" + searchInput + "/events?app_id=codingbootcamp";
            try {
                const bandResponse = await axios.get(queryConcert);
                console.log("Venue: " + bandResponse.data[0].venue.name);
                console.log("City: " + bandResponse.data[0].venue.city);
                console.log(moment(bandResponse.data[0].datetime).format("MM/DD/YYYY"));
            } catch (e) {
                console.log(e);
            }
        };

        if (userRes.action === 'movie-this') {
            console.log(`Movie Details`);
            getMovieInfo();
        } else if (userRes.action === 'spotify-this-song') {
            console.log(`Song Details`)
            getSong();
        } else if (userRes.action === 'concert-this') {
            console.log(`Concert Details`)
            getArtistEvent();
        }

    });
} runSearch();





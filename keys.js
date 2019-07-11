//var spotify = new spotify(keys.spotify);

//console.log('keys.js -this is loaded');


const keys = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  }

  module.exports = {keys};

  //console.log(process.env.SPOTIFY_ID);
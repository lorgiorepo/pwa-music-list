var URL = 'https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=3ffdca128fc40ffc5798bf3c1f1cc096&format=json';

function getArtists() {
    return fetch(URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) { 
            return data.topartists.artist
        })
        .then(function(artists) { 
            return artists.map(artist => ({
                name: artist.name,
                image: artist.image[3]['#text'],
                likes: 200,
                comments: 140
            }))
        });
}
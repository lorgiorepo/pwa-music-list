(function () {
	var headerElement = document.querySelector('.header');
	var menuHeaderElement = document.querySelector('.menu__header');

    var URL = 'https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=3ffdca128fc40ffc5798bf3c1f1cc096&format=json';

    var app = new Vue({
        el: '#artist-container',
        data: function () {
            return { 
                artistList: this.get()
            }
        },
        created: function() {
            this.get()
        },
        methods: {
            get: function() {
                var self = this
                axios.get(URL)
                    .then(function(response) {
                        return response.data;
                    })
                    .then(function(data) { 
                        return data.topartists.artist
                    })
                    .then(function(artists) { 
                        self.artistList = artists.map(artist => ({
                            name: artist.name,
                            image: artist.image[3]['#text'],
                            likes: 200,
                            comments: 140
                        }));
                    })
            }
        }
    })

	//Once the DOM is loaded, check for connectivity
	document.addEventListener('DOMContentLoaded', function(event) { 
		if (!navigator.onLine) {
			goOffline();
		}

		//Offline event listener
		window.addEventListener("offline", function () {
			goOffline();
		});
		
		//Online event listener
		window.addEventListener("online", function () {
			goOnline()
		});
	});

	function goOffline() {
        toast('App is offline');
		headerElement.style.background = '#9E9E9E';
		menuHeaderElement.style.background = '#9E9E9E';
	}

	function goOnline() {
		headerElement.style.background = '';
		menuHeaderElement.style.background = '';
	}
})();
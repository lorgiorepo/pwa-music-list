var CACHE_NAME = 'cache-v1'; //Cache Name

//Files to cache
var filesToCache = [
	'/',
	'./index.html',
	'./index.html?utm=homescreen', //Query strings are treated as seperate page
	'./css/styles.css',
    './js/menu.js',
	'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700' //3rd party resource
];

//Adding 'install' event listener
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(filesToCache);
      })
			.catch(function (err) {
  			console.log("Error occurred while caching ", err);
  		})
  );  
});

//Adding 'activate' event listener
self.addEventListener('activate', function (event) {
  console.log('Event: Activate');
});

//Adding 'fetch' event listener

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

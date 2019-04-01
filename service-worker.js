var CACHE_NAME = 'cache-v2'; //Cache Name

//Files to cache
var filesToCache = [
	'/',
	'./index.html',
	'./index.html?utm=homescreen', //Query strings are treated as seperate page
	'./css/styles.css',
    './js/menu.js',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700', //3rd party resource
  './images/push-off.png',
  './images/push-on.png'
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


// triggered everytime, when a push notification is received.
self.addEventListener('push', function(event) {

  console.info('Event: Push');

  var title = 'New commit on Github Repo: RIL';

  var body = {
    'body': 'Click to see the latest commit',
    'tag': 'pwa',
    'icon': './images/48x48.png'
  };

  event.waitUntil(
    self.registration.showNotification(title, body)
  );
});


self.addEventListener('notificationclick', function(event) {

  var url = './latest.html';

  event.notification.close(); //Close the notification

  // Open the app and navigate to latest.html after clicking the notification
  event.waitUntil(
    clients.openWindow(url)
  );

});
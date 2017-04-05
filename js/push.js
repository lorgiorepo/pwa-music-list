function initMessaging() {
    var config = {
        apiKey: "AIzaSyDMGRyx3GtFLEDUkiTW4uplGx5VOJsJ1-A",
        authDomain: "pwa-music.firebaseapp.com",
        databaseURL: "https://pwa-music.firebaseio.com",
        projectId: "pwa-music",
        storageBucket: "pwa-music.appspot.com",
        messagingSenderId: "307842747987"
    };
    firebase.initializeApp(config);
    var messaging = firebase.messaging();
    
    syncToken();
    
    messaging.onMessage(function(payload) {
        console.log("Message received. ", payload);
    });
}

function syncToken() {
    messaging.getToken()
    .then(function(currentToken) {
        console.log(currentToken);
      if (currentToken) {
        sendTokenToServer(currentToken);
      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
      }
    })
    .catch(function(err) {
      console.log('An error occurred while retrieving token. ', err);
    });
}

function sendTokenToServer(token) {
    var config = {
        headers: {
            authorization: 'AAAAR6zbjlM:APA91bEZvz22XTQOgs2YA-cMqn16_1XsGVw2Z-SvBCVtnVEBSGIs-Pk5D6Y7oBTtcBzgmtcNXPpWxMh_wh7mst4bSbbXoYShtoLyO6P1v7rSRSYJIeDUr7p82X-307OmBoLZGNg1Psxx'
        }
    };

    var params = {
        operation: 'add',
        notification_key_name: 'musiclist',
        notification_key: 'APA91bHLUsSTZjMhWVrQcUUDuWqzWk5lVtDlr5x1wj5nQbrN0H7-q6duFeDY_aeY3i1Tt3w40fcm-0WaLI8OOkVuh9djH93DMRhRI4aCbR8GPnj3dTfv0B8',
        registration_ids: token
    };

    axios.post('https://android.googleapis.com/gcm/notification', params, config)
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        })
}
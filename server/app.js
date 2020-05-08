import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import error from './functions/error'
//import admin from 'firebase-admin'
//import adminSDK from './adminsdk2.json'
import cors from 'cors'
//import VueAudio from 'vue-audio';
   

/*admin.initializeApp({
  credential: admin.credential.cert(adminSDK),
  apiKey: "AIzaSyBurhIRj8at0y-B1mdXt5W_TO0p2JKWRbU",
  authDomain: "contactform-db338.firebaseapp.com",
  databaseURL: "https://contactform-db338.firebaseio.com",
  projectId: "contactform-db338",
  storageBucket: "contactform-db338.appspot.com",
  messagingSenderId: "310213384832",
  appId: "1:310213384832:web:15f041dbf569b172"
})*/

/*admin.initializeApp({
  credential: admin.credential.cert(adminSDK),
    apiKey: "AIzaSyC8g0r5FYg0twLZv43RhjaHgDeiyMkyIq8",
    authDomain: "jeromoto-a920c.firebaseapp.com",
    databaseURL: "https://jeromoto-a920c.firebaseio.com",
    projectId: "jeromoto-a920c",
    storageBucket: "jeromoto-a920c.appspot.com",
    messagingSenderId: "826180265231"
})*/

/*admin.initializeApp({
  credential: admin.credential.cert(adminSDK),
  databaseURL: "https://jeromotosfb.firebaseio.com"
})*/

//var registrationToken = 'e9gWXzr3JI8:APA91bEiWxKC0tpDkxghwZV7ShyfUT6S_-HCHiOI7J41ERcyh5N6yXjTXOuf4hwhSrPGSpMDIfnrmcgWqZY0tk1QxI11hxR4xL_Gkpmr4bM6O4-_CZwaF6D2ZUVjiQu2EkGpd3WQ43QQ';

var message = {
  notification:{
    title:"Notification 1",  
    body:"Notification 2",   
  },
  data:{
    "param1":"value1", 
    "param2":"value2"
  },
  //token: 'cGO_35a_eCE:APA91bEWy0oKPja7cPGYvkHZAktC9tnjzF_ouNQyRYD0kxcW8sgPOrwp3YWB5WQiKmjw6pbKm7dlRRz8XLRrxiegbog1GuX17vkBtHEpy27bCsAAPP7WPqC7IVAolErswG2-nt6tMMlx'
    token:'e9gWXzre3JL8:APA91bEiWxKC0tpDkxghwZV7ShyfUT6S_-HCHiOI7J41ERcyh5N6yXjTXOuf4hwhSrPGSpMDlfnrmcgWqZY0tk1QxI11hxR4xL_Gkpmr4bM6O4-_CZwaF6D2ZUVjiQu2EkGpd3WQ43QQ'
}
// Send a message to the device corresponding to the provided
// registration token.
/*admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });*/

  /*function getAccessToken() {
    return new Promise(function(resolve, reject) {
      var key = require('./adminsdk2.json');
      var jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        SCOPES,
        null
      );
      jwtClient.authorize(function(err, tokens) {
        if (err) {
          reject(err);
          return;
        }
        console.log(tokens)
        resolve(tokens.access_token);
      });
    });
  }*/

  //getAccessToken();


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

fs.readdirSync(path.join(__dirname, 'rutas')).forEach((file) => {
  var name = file.substr(0, file.indexOf('.'))
  if (name == "index") {
    const func = require(`./rutas/${name}`).default
    app.use('/', func)
  } else {
    const func = require(`./rutas/${name}`).default
    app.use('/' + name, func)
  }

})

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send(JSON.stringify(error(err)));
});

app.use((req, res, next) => {
  const err = new Error('No encontrado');
  err.status = 404;
  next(err);
});

process.on('uncaughtException', (err) => {
  console.log(err);
  process.exit(1);
});

export default app
const functions = require('firebase-functions')
const express = require("express")
const app = express();
const api = require('./api/api')
const db = require('./api/database')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const { PubSub } = require("@google-cloud/pubsub");
const pubsub = new PubSub();
const bodyParser = require('body-parser');
const cors = require('cors');
const timeout = require('connect-timeout');
const respHandler = require('./api/handler/response.handler')
const config = require('./api/config')

app.options('*', cors());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use(express.json())
app.use(timeout('300s'));
app.use(cookieParser())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'testing',
  cookie: { maxAge: 3600000 * 24 }
}))
app.use(bodyParser.json())

api({ app: app })

exports.wealthupptest = functions.https.onRequest(app)

exports.functionsTimeOut = functions.runWith({
  timeoutSeconds: 300
})

exports.onlogcreate = require('./api/events/onlogcreateevent')
exports.onsecondaryevent = require('./api/events/onsecondaryevent')
exports.apipostpubevent = require('./api/events/apipostpubevent')
exports.secondrecpubevent = require('./api/events/secondrecpubevent')


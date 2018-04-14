// server/api.js
/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const Songs = require('./models/Songs');
/*
 |--------------------------------------
 | Authentication Middleware
 |--------------------------------------
 */

module.exports = function (app, config) {
  // Authentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
       jwksUri: "https://distortia.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://localhost:8083/api/',
    issuer: "https://distortia.auth0.com/",
    algorithm: 'RS256'
  });

  // Check for an authenticated admin user
  const adminCheck = (req, res, next) => {
    const roles = req.user[config.NAMESPACE] || [];
    if (roles.indexOf('admin') > -1) {
      next();
    } else {
      res.status(401).send({message: 'Not authorized for admin access'});
    }
  }
  
  /*
   |--------------------------------------
   | API Routes
   |--------------------------------------
   */

  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

  // GET list of all songs, public and private (admin only)
  app.get('/api/songs', jwtCheck, (req, res) => {
    Songs.find({}, _songsListProjection, (err, songs) => {
      let songsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (songs) {
        songs.forEach(song => {
          songsArr.push(song);
        });
      }
      res.send(songsArr);
    });
  });

  // GET song by song ID
  app.get('/api/songs/:id', jwtCheck, (req, res) => {
    Songs.findById(req.params.id, (err, song) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!song) {
        return res.status(400).send({message: 'Song not found.'});
      }
      res.send(song);
    });
  });

};
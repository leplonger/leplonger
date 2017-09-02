const connection = require('../db');
const Api = require('../../config/index.js');
const axios = require('axios');
const visUtils = require('../../visualization/visUtils.js');

module.exports = {
  users: {
    get: (user, callback) => {
      const userInfo = [user.user, user.pass];
      const queryString = `SELECT salt, password, id, skill, name FROM users WHERE name = '${userInfo[0]}';`;

      connection.query(queryString, (err, data) => {
        if (err) {
          console.log('err');
          callback(err, null);
        } else {
          console.log('Schema query: ', data);
          callback(null, data);
        }
      });
    },

    post: (newUser, callback) => {
      const user = [newUser.name, newUser.password, newUser.email, newUser.salt, newUser.age, newUser.skill];
      const queryString = 'INSERT INTO users( name, password, email, salt, age, skill ) VALUES (?, ?, ?, ?, ?, ?);';

      connection.query(queryString, user, (err, data) => {
        if (err) {
          console.log('Error: ', err);
          callback(err, null);
        } else {
          console.log('posted users to database');
          callback(null, data);
        }
      });
    },
  },

  dive_sites: {
    get: (req, res) => {
      connection.query('SELECT * FROM dives', (err, data) => {
        if (!err) {
          res.send(data);
        } else {
          console.log('Error retrieving dive sites: ', err.message);
          res.send(404);
        }
      })
    },

    post: (new_sites, callback) => {
      const diveSite = [new_sites.name, new_sites.longitude, new_sites.latitude, new_sites.rating, new_sites.description, new_sites.user_dive];
      const queryString = 'INSERT INTO dives( name, longitude, latitude, rating, description, user_dive ) VALUES ( ?, ?, ?, ?, ?, ?)';

      connection.query(queryString, diveSite, (err, data) => {
        if (err) {
          console.log('could not post dive-sites to database');
          callback(err, null);
        } else {
          console.log('posted dive-sites to database');
          callback(null, data);
        }
      });
    },
  },

  comments: {
    get: (req, res) => {
      const diveID = req.body.diveSite_id;
      const queryString = 'SELECT * FROM comments INNER JOIN dives ON dives.id=comments.divesite_id LEFT JOIN users ut on comments.user_id = ut.id WHERE comments.divesite_id=' + diveID;

      return connection.queryAsync(
        queryString
      );
    },

    post: (comment, callback) => {
      const newComment = [comment.divesiteId, comment.message, comment.userId, comment.date1];
      const queryString = 'INSERT INTO comments(divesiteId, message, userId, date1 ) VALUES(?,?,?,?)';
      connection.query(queryString, newComment, (err, data) => {
        if (err) {
          console.log('could not post comment to database');
          callback(err, null);
        } else {
          console.log('posted new comment data to database');
          callback(null, data);
        }
      });
    },
  },

  weather: {
    // uncomment url for actual use, disabled so we don't hit api limit
    get: (req, res) => {
      const location = `${req.body.location.lat},${req.body.location.lng}`;
      const url = `http://api.wunderground.com/api/${Api.weatherUnderground}/geolookup/conditions/q/${location}.json`;

      axios.get(url)
        .then((result) => {
          console.log('received data from weatherUnderground');
          res.json(result.data);
        })
        .catch((err) => {
          console.log('error from weather api: ', err.message);
        });
    },

    home: (req, res) => {
      let homeWeather = [];
      const norCalCoordinates = '37.7910,-122.5401';
      const centralCalCoordinates = '35.3257,-120.9237';
      const southCalCoordinates = '37.8267,-122.4233';

      axios.get(`https://api.darksky.net/forecast/${Api.darkSky}/${norCalCoordinates}`)
        .then((result) => {
          homeWeather.push(result.data);
          axios.get(`https://api.darksky.net/forecast/${Api.darkSky}/${centralCalCoordinates}`)
            .then((res) => {
              homeWeather.push(res.data);
              axios.get(`https://api.darksky.net/forecast/${Api.darkSky}/${southCalCoordinates}`)
                .then((resLOLSERIOUSLYWHATISTHISCODEMAN) => {
                  homeWeather.push(resLOLSERIOUSLYWHATISTHISCODEMAN.data);
                  resLOLSERIOUSLYWHATISTHISCODEMAN.json(homeWeather);
                });
            });
        })
        .catch((err) => {
          console.log('Error retrieving home page weather: ', err.message);
        });
    },
  },

  ocean: {
    get: (req, res) => {
      /*  field options for formatData:  [ '#YY','MM','DD','hh','mm','WDIR','WSPD','GST','WVHT',
      'DPD','APD','MWD','PRES','ATMP','WTMP','DEWP','VIS','PTDY','TIDE' ] */
      const latitude = +req.body.location.lat;
      const longitude = +req.body.location.lng * -1;
      const bouyId = visUtils.getBouy(latitude, longitude);

      axios.get(`http://www.ndbc.noaa.gov/data/realtime2/${bouyId}.txt`)
        .then((result) => {
          // const toFormat = result.data.split('\n').slice(0, 14);
          // COMMENTED OUT because what the hell is it even doing
          const waveHeights = visUtils.formatData(result.data, 'WVHT');
          res.send({ heights: waveHeights, id: bouyId });
        })
        .catch((err) => {
          console.log('Error getting bouy data: ', err);
        });
    },
  },
};


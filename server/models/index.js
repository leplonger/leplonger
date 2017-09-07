const axios = require('axios');

const connection = require('../db');
const Api = require('../../config/index.js');
const visUtils = require('../../visualization/visUtils.js');

module.exports = {
  dive_sites: {
    get: (callback) => {
      connection.query('SELECT * FROM dives', (err, data) => {
        if (err) {
          console.log('Error retrieving dive sites: ', err.message);
          callback(err, null);
        } else {
          callback(null, data);
        }
      });
    },
    post: (newSites, callback) => {
      const diveSite = [newSites.name, newSites.longitude, newSites.latitude, newSites.rating, newSites.description, newSites.user_dive];
      const queryString = 'INSERT INTO dives( name, longitude, latitude, rating, description, user_dive ) VALUES ( ?, ?, ?, ?, ?, ?)';

      connection.query(queryString, diveSite, (err, data) => {
        if (err) {
          console.log('Error adding new divesite: ', err.message);
          callback(err, null);
        } else {
          callback(null, data);
        }
      });
    },
  },

  users: {
    get: (user, callback) => {
      const userInfo = [user.user, user.pass];
      const queryString = `SELECT salt, password, id, skill, name FROM users WHERE name = '${userInfo[0]}';`;

      connection.query(queryString, (err, data) => {
        if (err) {
          console.log('Error: ', err);
          callback(err, null);
        } else {
          callback(null, data);
        }
      });
    },
    post: (newUser, callback) => {
      const user = [newUser.name, newUser.password, newUser.email, newUser.salt, newUser.age, newUser.skill];
      const queryString = 'INSERT INTO users( name, password, email, salt, age, skill ) VALUES (?, ?, ?, ?, ?, ?);';

      connection.query(queryString, user, (err, data) => {
        if (err) {
          console.log('Error adding new user: ', err);
          callback(err, null);
        } else {
          callback(null, data);
        }
      });
    },
  },

  comments: {
    get: (req) => {
      const diveID = req.body.diveSite_id;
      const queryString = `SELECT * FROM comments INNER JOIN dives ON dives.id=comments.divesite_id LEFT JOIN users ut on comments.user_id = ut.id WHERE comments.divesite_id=${diveID}`;
      return connection.queryAsync(queryString);
    },
    post: (comment, callback) => {
      const newComment = [comment.divesiteId, comment.message, comment.userId, comment.date1];
      const queryString = 'INSERT INTO comments(divesiteId, message, userId, date1 ) VALUES(?,?,?,?)';
      connection.query(queryString, newComment, (err, data) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data);
        }
      });
    },
  },

  weather: {
    get: (location, callback) => {
      // uncomment url for actual use, disabled so we don't hit api limit
      // const url = `http://api.wunderground.com/api/${Api.weatherUnderground}/geolookup/conditions/q/${location}.json`;
      axios.get(url)
        .then(({ data }) => {
          callback(null, data);
        })
        .catch((err) => {
          console.log('error from weather api: ', err.message);
          callback(err, null);
        });
    },
    home: (callback) => {
      let homeWeather = [];
      const norCalCoordinates = '37.7910,-122.5401';
      const centralCalCoordinates = '35.3257,-120.9237';
      const southCalCoordinates = '37.8267,-122.4233';

      axios.get(`https://api.darksky.net/forecast/${Api.darkSky}/${norCalCoordinates}`)
        .then(({ data }) => {
          homeWeather.push(data);
          axios.get(`https://api.darksky.net/forecast/${Api.darkSky}/${centralCalCoordinates}`)
            .then(({ data2 }) => {
              homeWeather.push(data2);
              axios.get(`https://api.darksky.net/forecast/${Api.darkSky}/${southCalCoordinates}`)
                .then(({ data3 }) => {
                  homeWeather.push(data3);
                  callback(null, homeWeather);
                });
            });
        })
        .catch((err) => {
          console.log('Error retrieving home page weather: ', err.message);
          callback(err, null);
        });
    },
  },

  ocean: {
    get: (req, callback) => {
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
          callback(null, { heights: waveHeights, id: bouyId });
        })
        .catch((err) => {
          console.log('Error getting bouy data: ', err);
          callback(err, null);
        });
    },
  },
};


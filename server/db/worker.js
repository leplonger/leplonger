const models = require('../models/index.js');
const userData = require('./sampledata/users.js');
const diveData = require('./sampledata/divesites.js');
const commentData = require('./sampledata/comments.js');

// saves seed data to database
diveData.divesites.forEach((site) => {
  models.dive_sites.post(site, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`saved dive-site to database ${data}`);
    }
  });
});

userData.users.forEach((user) => {
  models.users.post(user, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`saved user to database ${data}`);
    }
  });
});

commentData.comments.forEach((comment) => {
  models.comments.post(comment, (err, data) => {
    if (err) {
      console.log('Error in posting comment to database from worker: ', err);
    } else {
      console.log(`saved comments to database ${data}`);
    }
  });
});

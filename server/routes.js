const controller = require('./controllers');

const router = require('express').Router();

router.route('/dives')
  .get(controller.dives.get);

router.route('/users')
  .post(controller.users.post);

router.route('/new_users')
  .post(controller.new_users.post);

router.route('/comments')
  .post(controller.comments.get);

router.route('/newcomment')
  .post(controller.comments.post);

router.route('/weather')
  .post(controller.weather.get);

router.route('/weather/home')
  .get(controller.weather.home);

router.route('/ocean')
  .post(controller.ocean.get);

router.route('/new_sites')
  .post(controller.new_sites.post);

module.exports = router;

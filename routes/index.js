
var $ = require('jquery-deferred'),
    mongodb = require('../mongodb');

exports.index = function(req, res, params) {
  res.render('index', {});
};

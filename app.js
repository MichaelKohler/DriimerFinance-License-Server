(function () {
  'use strict';

  var express = require('express');
  var app = express();

  var server = app.listen(3000, function () {
    console.log('Server started on Port ' + server.address().port);
  });

  /** ROUTES **/
  var license = require('./license');
  app.get('/createLicense', license.createLicense); // wrong approach with GET, but we need it the easy way right now for demonstration
  app.post('/checkLicense', license.checkLicense);
}());
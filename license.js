(function () {
  var Datastore = require('nedb'),
      db = new Datastore({ filename: 'license.db', autoload: true });

  exports.createLicense = function createLicense(req, res) {
    var today = new Date(),
        oneYearInMs = 365 * 24 * 60 * 60 * 1000,
        inAYear = new Date(today.getTime() + oneYearInMs),
        license = {
          key: calcKey(),
          validFrom: today,
          validTo: inAYear
        };
    db.insert(license, function (err, addedLicense) {
      res.send(JSON.stringify(license));
    });
  };

  exports.checkLicense = function checkLicense(req, res) {
    var licenseKeyToCheck = req.body.key;
    db.find({ key: licenseKeyToCheck}, function (error, license) {
      if (error) {
        return JSON.stringify(error);
      }
      if (license.length == 0) {
        return JSON.stringify({
          valid: false,
          validFrom: 0,
          validTo: 0
        });
      }
      var validFrom = new Date(license[0].validFrom),
          validTo = new Date(license[0].validTo),
          foundLicense = {
            valid: validFrom <= new Date() && new Date() <= validTo,
            validFrom: validFrom,
            validTo: validTo
          };
          res.send(JSON.stringify(foundLicense));
    });
  };

  function calcKey() {
    var generatedCode = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return generatedCode;
  }
}());
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
    console.log(licenseKeyToCheck);
    db.find({ key: licenseKeyToCheck }, function (error, license) {
      if (error) {
        res.send(JSON.stringify(error));
        return;
      }
      console.log(error);
      console.log(license);
      if (license.length == 0) {
        res.send(JSON.stringify({
          valid: false,
          validFrom: 0,
          validTo: 0
        }));
        return;
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
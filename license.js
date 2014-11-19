(function () {
  exports.createLicense = function createLicense(req, res) {
    var today = new Date(),
        oneYearInMs = 365 * 24 * 60 * 60 * 1000,
        inAYear = new Date(today.getTime() + oneYearInMs),
        license = {
            key: calcKey(),
            validFrom: today,
            validTo: inAYear
        };
    // TODO: save in DB
    res.send(JSON.stringify(license));
  };

  exports.checkLicense = function checkLicense(req, res) {
    // TODO: get from DB according to key
    var valid = false,
        tooEarly = false,
        tooLate = false;
  };

  function calcKey() {
    var generatedCode = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return generatedCode;
  }
}());
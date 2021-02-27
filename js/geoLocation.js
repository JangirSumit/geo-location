const GEO = (function geoLocation() {
  var _options = {};

  var setOptions = function (options) {
    _options = options;
  };

  var getCurrentLocation = function (success, failure) {
    return navigator.geolocation.getCurrentPosition(success, failure, _options);
  };

  return {
    setOptions,
    getCurrentLocation,
  };
})();

export default GEO;

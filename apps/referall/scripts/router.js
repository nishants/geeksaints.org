(function () {
  'use strict';
  //url format : uri#param-name-1_param-value-1_param-name2_param-value2
  var Router = function (state) {
  };
  var hasFragment = function (url) {
    return url.indexOf("#") != -1;
  };

  var fragmentFrom = function (url) {
    return url.split("#")[1];
  };

  // return view params from url
  Router.prototype.parseUrl = function (url) {
    var params = {};
    if (hasFragment(url)) {
      var tokens = fragmentFrom(url).split("_");
      for (var i = 0; i < tokens.length - 1; i += 2) {
        params[tokens[i]] = tokens[i + 1];
      }
    }
    return params;
  };

  // update route on view navigation
  Router.prototype.updateRoute = function (params) {

  };

  window.referall.Router = Router;

}).call(this);
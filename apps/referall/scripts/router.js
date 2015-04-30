(function () {
  'use strict';

  var hasFragment = function (url) {
    return url.indexOf("#") != -1;
  };

  var fragmentFrom = function (url) {
    return url.split("#")[1];
  };

  var parse = function (url) {
    return url.split("_");
  };

  var toParams = function (tokens) {
    var params = {};
    for (var i = 0; i < tokens.length - 1; i += 2) {
      params[tokens[i]] = tokens[i + 1];
    }
    return params;
  };

  var Router = function () {};

  Router.prototype.parseUrl = function (url) {
    return hasFragment(url) ? toParams(parse(fragmentFrom(url))) : {};
  };

  window.referall.Router = Router;

}).call(this);
(function() {
  'use strict';
  
  var Promise = function(){};
  
  Promise.prototype.ok = function(callback){
    this.okCallback = callback;
    return this;
  };
  
  Promise.prototype.error = function(callback){
    this.errorCallback = callback;
    return this;
  };
  
  Promise.prototype.fulfill = function(data){
    this.okCallback(data);
    return this;
  };
 
  Promise.prototype.sorry = function(data){
    this.errorCallback(data);
    return this;
  };

  if(!window.geeksaints) window.geeksaints = {};
  window.geeksaints.Promise = Promise;
  
}).call(this);
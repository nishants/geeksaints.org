
var router = {};

QUnit.module('Router', {
  setup: function() {
    router = new window.referall.Router();
  },
  teardown: function() {
  }
});

QUnit.test( "Router", function( assert ) {
  assert.ok( router, "Router found!" );
});
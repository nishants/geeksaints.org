var router = {};

QUnit.module('Router', {
  setup: function() {
    router = new window.referall.Router();
  },
  teardown: function() {
  }
});

QUnit.test( "Create Router", function( assert ) {
  assert.ok( router, "Cannot create router" );
});

QUnit.test( "Should resolve view params from url fragment", function( assert ) {
  var params = router.parseUrl("https:geeksaints.org/referalll#view_jobs_list_all-jobs_location_3");
  assert.equal(params.view, "jobs");
  assert.equal(params.list, "all-jobs");
  assert.equal(params.location, 3);
});

QUnit.test( "Should return empty params if no url fragment", function( assert ) {
  var params = router.parseUrl("https:geeksaints.org/referalll");
  assert.deepEqual(params, {});
});

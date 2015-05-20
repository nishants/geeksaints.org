(function () {
  "use strict"

  var
      targetHtml = "<div id='jobs-container'></div>",
      prototypeHtml =
          "<div id='job-card-prototype' class='job-card'>" +
          "   <div class='job-url'></div>"+
          "   <div class='job-employer'></div>"+
          "   <div class='job-heading'></div>"+
          "   <div class='job-location'></div>"+
          "   <div class='job-date'></div>"+
          "</div>",
      jobCardsIn = function($e){return $e.find(".job-card");},
      target = function(){return $("#jobs-container");},
      dateIn = function($target){return $target.find(".job-date").first().html();},
      employerIn = function($target){return $target.find(".job-employer").first().html();},
      headingIn = function($target){return $target.find(".job-heading").first().html();},
      locationIn = function($target){return $target.find(".job-location").first().html();},
      urlIn = function($target){return $target.find(".job-date").first().html();},
      job = {
        url: "abc.com",
        employer: "AB Corp",
        role: "Fundoo Programmer | Free Stay",
        location: "Bangalore",
        time: "1432069067417"
      };

  QUnit.module("JobsCard", {
    setup: function () {
      $("#qunit-fixture").append(targetHtml);
      $("#qunit-fixture").append(prototypeHtml);
    }
  });

  QUnit.test("Should create and append jobs card", function (assert) {
    var jobCard = new referall.JobCard(job),
        done = assert.async();

    jobCard.appendTo(target());
    var createdJob = jobCardsIn(target()).first();

    setTimeout(function(){
      assert.equal(dateIn(createdJob), "May 20", "format date to MMM/D");
      assert.equal(employerIn(createdJob), "AB Corp", "render employer name");
      assert.equal(headingIn(createdJob), "Fundoo Programmer | Free Stay", "reder role name");
      assert.equal(locationIn(createdJob), "Bangalore", "render location name");
      //assert.ok(urlIn(createdJob), "abc.com");
      jobCard.delete();
      assert.equal(jobCardsIn(target()).length, 0, "should delete self");
      done();
    });

    assert.expect(5);
  });

}).call(this);
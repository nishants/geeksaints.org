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
        heading: "Fundoo Programmer | Free Stay",
        location: "Bangalore",
        date: "May 13"
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
      assert.ok(dateIn(createdJob), "May 13");
      assert.ok(employerIn(createdJob), "AB Corp");
      assert.ok(headingIn(createdJob), "Fundoo Programmer | Free Stay");
      assert.ok(locationIn(createdJob), "Bangalore");
      //assert.ok(urlIn(createdJob), "abc.com");

      done();
    });
    assert.expect(4);
  });

}).call(this);
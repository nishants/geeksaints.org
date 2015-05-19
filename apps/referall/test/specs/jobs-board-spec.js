(function () {
  "use strict"

  var jobs = [{url:"1"},{url:"2"},{url:"3"}],
      jobsCreated = [],
      MockedJobsCard = function (job) {
        this.appendTo = function($e){
          this.appendedTo = $e;
          jobsCreated.push(job);
        };

        this.assertAppendedTo = function(assert, toPage){
          var appendedTo = this.appendedTo;
          assert.equal(toPage, appendedTo, "Jobs Card must be appended to the page")
        };
      },
      page = function(){return $("#jobs-board");},
      jobCards = function(){return $(".job-card:visible");},
      pageHtml =
          '<div id="jobs-board">                            '+
          '   <div id="jobs-list" class="jobs-list">        '+
          '     <div id="sample-job-card" class="job-card">      '+
          '   </div>                                        '+
          '</div>                                           ';

  QUnit.module("JobsBoard", {
    setup: function () {
      $("#qunit-fixture").append(pageHtml);
      referall.JobCard = MockedJobsCard;
    }
  });

  QUnit.test("Should Display Page", function (assert) {
    page().hide();
    new referall.JobsBoard(page(), jobs);

    assert.ok(page().is(":visible"), "Should display page");
    assert.deepEqual(jobsCreated, jobs)
  });

}).call(this);
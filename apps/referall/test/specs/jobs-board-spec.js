(function () {
  "use strict"

  var
      mumbaiDeveloperFlipkart = {url: "1", location: "Mumbai", role: "Developer", emlpoyer: "flipkart"},
      delhiTesterAmazon = {url: "2", location: "Delhi", role: "Tester", emlpoyer: "amazon"},
      bangaloreManagerSnapdeal = {url: "3", location: "Bangalaore", role: "Manager", emlpoyer: "snapdeal"},
      delhiTesterFlipkart = {url: "4", location: "Delhi", role: "Tester", emlpoyer: "flipkart"},
      jobs ,
      jobsCreated = [],
      page = function(){return $("#jobs-board");},

      MockedJobsCard = function (job) {
        this.appendTo = function($e){
          if($e.id == page().id)jobsCreated.push(job);
        };

        this.remove = function(){
          jobsCreated.splice(jobsCreated.indexOf(job), 1);
        };
      },

      asyncCallback = function (callback) {
        setTimeout(function(){
          callback();
        })
      },

      filterByLocation = function (location) {
        var input = $("#filter-by-location");
        input.val(location);
        input.trigger("blur");
        return {then: asyncCallback}
      },

      pageHtml =
          '<div id="jobs-board">                                      '+
          '   <div id="filter-jobs" class="menu">                     '+
          '       <input type="text" id="filter-by-location"></div>   '+
          '       <input type="text" id="filter-by-employer"></div>   '+
          '       <input type="text" id="filter-by-role"></div>       '+
          '   </div>                                                  '+
          '   <div id="jobs-list" class="jobs-list">                  '+
          '     <div id="sample-job-card" class="job-card">           '+
          '   </div>                                                  '+
          '</div>                                                     ';

  QUnit.module("JobsBoard", {
    setup: function () {
      $("#qunit-fixture").append(pageHtml);
      page().hide();
      jobsCreated = [];
      jobs = new referall.Jobs([
            mumbaiDeveloperFlipkart,
            delhiTesterAmazon,
            bangaloreManagerSnapdeal,
            delhiTesterFlipkart]
      );
      new referall.JobsBoard(page(), jobs, MockedJobsCard);
    }
  });

  QUnit.test("Should Display Page", function (assert) {
    assert.ok(page().is(":visible"), "Should display page");
    assert.deepEqual(jobsCreated, jobs.list(), 'Should create a JobsCard for each jobs and append to document')
  });

  QUnit.test("Should filter jobs by location, employer or role", function (assert) {
    var delhiJobs = [delhiTesterAmazon, delhiTesterFlipkart],
        delhiJobsFiltered = assert.async(),
        mumbaiJobsFiltered = assert.async();

    filterByLocation("DeLhI").then(function () {
      assert.deepEqual(jobsCreated, delhiJobs , 'Should filter by location, ignoring case')
      delhiJobsFiltered();
    });
    assert.expect(1);
  });

}).call(this);
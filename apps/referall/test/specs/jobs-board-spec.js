(function () {
  "use strict"

  var
      mumbaiDeveloperFlipkart = {url: "1", location: "Mumbai", role: "Developer", employer: "flipkart"},
      delhiTesterAmazon = {url: "2", location: "Delhi", role: "Tester", employer: "amazon"},
      bangaloreManagerSnapdeal = {url: "3", location: "Bangalaore", role: "Manager", employer: "snapdeal"},
      delhiTesterFlipkart = {url: "4", location: "Delhi", role: "Tester", employer: "flipkart"},
      jobs ,
      jobsCreated = [],
      page = function(){return $("#jobs-board");},

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
      
      filterByEmployer = function (employer) {
        var input = $("#filter-by-employer");
        input.val(employer);
        input.trigger("blur");
        return {then: asyncCallback}
      },

      jobsCreated = function(){
        var $jobs = $(".job-card"),
            jobs = [];
        for(var i =0; i < $jobs.length; i++ ){
          var $job = $($jobs.get(i)),
              isProttype = $job.attr("id") == "job-card-prototype";

          if(!isProttype){
            jobs.push({
              url       : $job.find(".job-url").html(),
              employer  : $job.find(".job-employer").html(),
              role      : $job.find(".job-heading").html(),
              location  : $job.find(".job-location").html()
            })

          }
        }

        return jobs;
      },

      areSame = function(aJob, anotherJob){
        return
                aJob.url == anotherJob.url &&
                aJob.location == anotherJob.location &&
                aJob.employer == anotherJob.employer &&
                aJob.role == anotherJob.role;

      },

      pageHtml =
          '<div id="jobs-board">                                      '+
          '   <div id="filter-jobs" class="menu">                     '+
          '       <input type="text" id="filter-by-location"/>        '+
          '       <input type="text" id="filter-by-employer"/>        '+
          '       <input type="text" id="filter-by-role"/>            '+
          '   </div>                                                  '+
          '   <div id="jobs-list" class="jobs-list">                  '+
          '   </div>                                                  '+
          '</div>                                                     ',

      prototypeHtml =
          "<div id='job-card-prototype' class='job-card'>" +
          "   <div class='job-url'></div>"+
          "   <div class='job-employer'></div>"+
          "   <div class='job-heading'></div>"+
          "   <div class='job-location'></div>"+
          "   <div class='job-date'></div>"+
          "</div>"
  ;

  QUnit.module("JobsBoard", {
    setup: function () {
      $("#qunit-fixture").append(pageHtml);
      $("#qunit-fixture").append(prototypeHtml);
      page().hide();
      jobs = new referall.Jobs([
            mumbaiDeveloperFlipkart,
            delhiTesterAmazon,
            bangaloreManagerSnapdeal,
            delhiTesterFlipkart]
      );
      new referall.JobsBoard(page(), jobs, referall.JobCard);
    }
  });

  QUnit.test("Should Display Page", function (assert) {
    assert.ok(page().is(":visible"), "Should display page");
    assert.deepEqual(jobsCreated(), jobs.list(), 'Should create a JobsCard for each jobs and append to document')
  });

  QUnit.test("Should not filter if no input is provided", function (assert) {
    var done = assert.async();

    filterByLocation("").then(function () {
      assert.deepEqual(jobsCreated(), [
        mumbaiDeveloperFlipkart,
        delhiTesterAmazon,
        bangaloreManagerSnapdeal,
        delhiTesterFlipkart] , 'ignore no input');
      done();
    });

    assert.expect(1);
  });

  QUnit.test("Should filter jobs by location", function (assert) {
    var delhiJobs = [delhiTesterAmazon, delhiTesterFlipkart],
        mumbaiJobs = [mumbaiDeveloperFlipkart],
        delhiJobsFiltered = assert.async(),
        mumbaiJobsFiltered = assert.async();

    filterByLocation("DeLhI").then(function () {
      assert.deepEqual(jobsCreated(), delhiJobs , 'filter by location, ignoring case');
      delhiJobsFiltered();

      filterByLocation("mumBAi").then(function () {
        assert.deepEqual(jobsCreated(), mumbaiJobs , 'filter by location recursively');
        mumbaiJobsFiltered();
      });
    });

    assert.expect(2);
  });

  QUnit.test("Should filter jobs by employer", function (assert) {
    var flipkartJobs = [mumbaiDeveloperFlipkart, delhiTesterFlipkart],
        amazonJobs = [delhiTesterAmazon],
        snapdealJobs = [bangaloreManagerSnapdeal],

        flipkartJobsFiltered = assert.async(),
        amazonJobsFiltered = assert.async(),
        snapdealJobsFiltered = assert.async();

    filterByEmployer("fliPkaRt").then(function () {
      assert.deepEqual(jobsCreated(), flipkartJobs , 'filter by employer, ignoring case');
      flipkartJobsFiltered();

      filterByEmployer("aMaZon").then(function () {
        assert.deepEqual(jobsCreated(), amazonJobs , 'filter by employer recursively');
        amazonJobsFiltered();


        filterByEmployer("snapdeal").then(function () {
          assert.deepEqual(jobsCreated(), snapdealJobs , 'filter by employer recursively');
          snapdealJobsFiltered();
        });
      });
    });

    assert.expect(3);
  });

}).call(this);
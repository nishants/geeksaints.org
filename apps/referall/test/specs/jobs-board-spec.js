(function () {
  "use strict"

  var
      mumbaiDeveloperFlipkart = {url: "1", location: "Mumbai", role: "Developer", employer: "flipkart"},
      delhiTesterAmazon = {url: "2", location: "Delhi", role: "Tester", employer: "amazon"},
      bangaloreManagerSnapdeal = {url: "3", location: "Bangalaore", role: "Manager", employer: "snapdeal"},
      delhiTesterFlipkart = {url: "4", location: "Delhi", role: "Tester", employer: "flipkart"},
      jobs ,

      allJobs = [
        mumbaiDeveloperFlipkart,
        delhiTesterAmazon,
        bangaloreManagerSnapdeal,
        delhiTesterFlipkart],

      delhiJobs = [delhiTesterAmazon, delhiTesterFlipkart],
      mumbaiJobs = [mumbaiDeveloperFlipkart],

      developerJobs = [mumbaiDeveloperFlipkart],
      testerJobs = [delhiTesterAmazon, delhiTesterFlipkart],
      managerJobs = [bangaloreManagerSnapdeal],

      flipkartJobs = [mumbaiDeveloperFlipkart, delhiTesterFlipkart],
      amazonJobs = [delhiTesterAmazon],
      snapdealJobs = [bangaloreManagerSnapdeal],

      page = function(){return $("#jobs-board");},

      asyncCallback = function (callback) {
        setTimeout(function(){
          callback();
        })
      },

      clearFilterByRole = function () {
        $("#filter-by-role").next().trigger("mousedown");
        return {then: asyncCallback}
      },

      filterByLocation = function (location) {
        var input = $("#filter-by-location");
        input.val(location);
        input.trigger("blur");
        return {then: asyncCallback}
      },

      filterByRole = function (rolel) {
        var input = $("#filter-by-role");
        input.val(rolel);
        input.trigger("blur");
        return {then: asyncCallback}
      },

      filterByEmployer = function (employer) {
        var input = $("#filter-by-employer");
        input.val(employer);
        input.trigger("blur");
        return {then: asyncCallback}
      },

      jobsDisplayed = function(){
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

      pageHtml =
          '<div id="jobs-board">                                      '+
          '   <div id="filter-jobs" class="menu">                     '+
          '        <div class="filter-widget">'+
          '            <input type="text" id="filter-by-location"  placeholder="location"/>'+
          '            <button class="button secondary large-font">X</button>'+
          '        </div>'+

          '        <div class="filter-widget">'+
          '            <input  type="text" id="filter-by-employer" placeholder="employer"/>'+
          '            <button class="button secondary large-font">X</button>'+
          '        </div>'+
          '  '+
          '        <div class="filter-widget">'+
          '            <input type="text" id="filter-by-role"    placeholder="role"/>'+
          '            <button class="button secondary large-font">X</button>'+
          '        </div>'+
          '   <div id="jobs-list" class="jobs-list">                  '+
          '   </div>                                                  ',

      jobCardPrototype =
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
      $("#qunit-fixture").append(jobCardPrototype);
      page().hide();
      jobs = new referall.JobsView([
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
    assert.deepEqual(jobsDisplayed(), jobs.list(), 'Should create a JobsCard for each jobs and append to document')
  });

  QUnit.test("Should not filter if no input is provided", function (assert) {
    var doneByLocation = assert.async(),
        doneByRole = assert.async(),
        doneByEmpoyer = assert.async();


    filterByLocation("").then(function () {
      assert.deepEqual(jobsDisplayed(), allJobs, 'ignore no input for location');
      doneByLocation();

      filterByRole("").then(function () {
        assert.deepEqual(jobsDisplayed(), allJobs, 'ignore no input for role');
        doneByRole();

        filterByEmployer("").then(function () {
          assert.deepEqual(jobsDisplayed(), allJobs, 'ignore no input for employer');
          doneByEmpoyer();
        });
      });
    });

    assert.expect(3);
  });

  QUnit.test("Should filter jobs by location", function (assert) {
    var delhiJobsFiltered = assert.async(),
        mumbaiJobsFiltered = assert.async();

    filterByLocation("DeLhI").then(function () {
      assert.deepEqual(jobsDisplayed(), delhiJobs , 'filter by location, ignoring case');
      delhiJobsFiltered();

      filterByLocation("mumBAi").then(function () {
        assert.deepEqual(jobsDisplayed(), mumbaiJobs , 'filter by location recursively');
        mumbaiJobsFiltered();
      });
    });

    assert.expect(2);
  });

  QUnit.test("Should filter jobs by employer", function (assert) {
    var flipkartJobsFiltered = assert.async(),
        amazonJobsFiltered = assert.async(),
        snapdealJobsFiltered = assert.async();

    filterByEmployer("fliPkaRt").then(function () {
      assert.deepEqual(jobsDisplayed(), flipkartJobs , 'filter by employer, ignoring case');
      flipkartJobsFiltered();

      filterByEmployer("aMaZon").then(function () {
        assert.deepEqual(jobsDisplayed(), amazonJobs , 'filter by employer recursively');
        amazonJobsFiltered();

        filterByEmployer("snapdeal").then(function () {
          assert.deepEqual(jobsDisplayed(), snapdealJobs , 'filter by employer recursively');
          snapdealJobsFiltered();
        });
      });
    });

    assert.expect(3);
  })

  QUnit.test("Should filter jobs by role", function (assert) {
    var developerJobsFiltered = assert.async(),
        testerJobsFiltered = assert.async(),
        managerJobsFiltered = assert.async();

    filterByRole("dEveLoper").then(function () {
      assert.deepEqual(jobsDisplayed(), developerJobs , 'filter by role, ignoring case');
      developerJobsFiltered();

      filterByRole("tEsteR").then(function () {
        assert.deepEqual(jobsDisplayed(), testerJobs , 'filter by role recursively');
        testerJobsFiltered();

        filterByRole("ManAger").then(function () {
          assert.deepEqual(jobsDisplayed(), managerJobs , 'filter by role recursively');
          managerJobsFiltered();
        });
      });
    });

    assert.expect(3);
  });

  QUnit.test("Should clear filters", function (assert) {
    var
        doneByLocation = assert.async(),
        doneByRole = assert.async(),
        doneByEmployer = assert.async();

    filterByLocation("delhi").then(function () {
      doneByLocation();

      filterByEmployer("flipkart").then(function () {
        doneByEmployer();

        filterByRole("developer").then(function () {
          assert.deepEqual(jobsDisplayed(), [], 'should display nothing if no job matches all criterion');

          clearFilterByRole().then(function () {
            assert.deepEqual(jobsDisplayed(), [delhiTesterFlipkart] , 'should clear filter');
            doneByRole();
          });
        });
      });
    });

    assert.expect(2);
  });

}).call(this);
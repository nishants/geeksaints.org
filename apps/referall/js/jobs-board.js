(function () {
  "use-strict"

  var
      $jobsListIn = function ($page) {
        return $page.find("#jobs-list");
      },

      textIn = function (input) {
        return $(input).val()
      },

      $locationFilter = function(){
        return $("#filter-by-location");
      },
      $employerFilter = function(){
        return $("#filter-by-employer");
      },

      $roleFilter = function(){
        return $("#filter-by-role");
      },

      readFilter = function(){
        return {
          location: textIn($locationFilter()),
          employer: textIn($employerFilter()),
          role:     textIn($roleFilter())
        };
      },

      renderingNeededFor = function (filter) {
        return filter.location ||
                filter.role ||
                filter.employer;
      },

      cards = [], //TODO fails if cards is declared inside constructor
      JobsBoard = function ($page, jobs, JobCard) {
        var
            createCardsFor = function (jobs) {
              jobs.list().forEach(function (job) {
                var jobsCard = new JobCard(job);
                cards.push(jobsCard);
                jobsCard.appendTo($jobsListIn($page));
              })
            },

            clearJobs = function () {
              cards.forEach(function (jobCard) {
                jobCard.remove();
              });
              cards = [];
            },

            filterJobsBy = function () {
              var filter = readFilter();

              if (renderingNeededFor(filter)) {
                clearJobs();
                new JobsBoard($page, jobs.selectBy(filter), JobCard);
              }
            };

        createCardsFor(jobs);
        $page.show();

        $locationFilter().on("blur", filterJobsBy);
        $employerFilter().on("blur", filterJobsBy);
        $roleFilter().on("blur", filterJobsBy);
      };

  window.referall.JobsBoard = JobsBoard;
}).call(this);
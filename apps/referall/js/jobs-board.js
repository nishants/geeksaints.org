(function () {
  "use-strict"

  var
      $jobsListIn = function ($page) {
        return $page.find("#jobs-list");
      },

      textIn = function (input) {
        return $(input).val()
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
            removeCards = function () {
              cards.forEach(function (jobCard) {
                jobCard.remove();
              });
              cards = [];
            },

            filterJobsBy = function (filter) {
              if (renderingNeededFor(filter)) {
                removeCards();
                new JobsBoard($page, jobs.selectBy(filter), JobCard);
              }
            };

        createCardsFor(jobs);

        $("#filter-by-location").on("blur", function () {
          filterJobsBy({location: textIn(this)});
          return false;
        });

        $("#filter-by-employer").on("blur", function () {
          filterJobsBy({employer: textIn(this)});
          return false;
        });

        $("#filter-by-role").on("blur", function () {
          filterJobsBy({role: textIn(this)});
          return false;
        });

        $page.show();
      };

  window.referall.JobsBoard = JobsBoard;
}).call(this);
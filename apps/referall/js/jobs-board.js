(function () {
  "use-strict"

  var getLocation = function () {
        return $("#filter-by-location");
      },
      getEmployer = function () {
        return $("#filter-by-employer");
      },
      getRole = function () {
        return $("#filter-by-role");
      },
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
            },

            onFilterByEmployer = function () {
              var employer = getEmployer().val();
              if (!employer || employer.trim() == "") {
                return this;
              }
              removeCards();
              return new JobsBoard(
                  $page,
                  jobs.filterByEmployer(employer),
                  JobCard);
            },

            onFilterByRole = function () {
              var role = getRole().val();
              if (!role || role.trim() == "") {
                return this;
              }
              removeCards();
              return new JobsBoard(
                  $page,
                  jobs.filterByRole(role),
                  JobCard);
            };

        createCardsFor(jobs);

        $("#filter-by-location").on("blur", function(){
          filterJobsBy({location: textIn(this)});
          return false;
        });

        getEmployer().on("blur", onFilterByEmployer);
        getRole().on("blur", onFilterByRole);
        $page.show();
      };

  window.referall.JobsBoard = JobsBoard;
}).call(this);
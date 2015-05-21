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

            onFilterByLocation = function () {
              var location = getLocation().val();
              if (!location || location.trim() == "") {
                return this;
              }
              removeCards();
              return new JobsBoard(
                  $page,
                  jobs.filterByLocation(location),
                  JobCard);
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
        getLocation().on("blur", onFilterByLocation);
        getEmployer().on("blur", onFilterByEmployer);
        getRole().on("blur", onFilterByRole);
        $page.show();
      };

  window.referall.JobsBoard = JobsBoard;
}).call(this);
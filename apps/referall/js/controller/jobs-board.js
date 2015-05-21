(function () {
  "use-strict"

  var
      JobCard,

      $jobsListIn = function ($page) {
        return $page.find("#jobs-list");
      },

      textIn = function (input) {
        return $(input).val()
      },

      $locationFilter = function () {
        return $("#filter-by-location");
      },
      $employerFilter = function () {
        return $("#filter-by-employer");
      },

      $roleFilter = function () {
        return $("#filter-by-role");
      },

      readFilter = function () {
        return {
          location: textIn($locationFilter()),
          employer: textIn($employerFilter()),
          role: textIn($roleFilter())
        };
      },

      addToPage = function ($page, cards) {
        cards.forEach(function (card) {
          card.appendTo($jobsListIn($page));
        });
      },

      renderingNeededFor = function (filter) {
        return filter.location ||
            filter.role ||
            filter.employer;
      },

      toCards = function (jobs) {
        var cards = [];
        jobs.forEach(function (job) {
          cards.push(new JobCard(job))
        });
        return cards;
      },

      render = function ($page, jobs) {
        var cards = toCards(jobs);
        addToPage($page, cards);
        $page.show();
        return cards;
      },

      cards = [], //TODO fails if cards is declared inside constructor

      JobsBoard = function ($page, jobs) {
        JobCard = referall.JobCard;
        var
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

        cards = render($page, jobs.list());
        $locationFilter().on("blur", filterJobsBy);
        $employerFilter().on("blur", filterJobsBy);
        $roleFilter().on("blur", filterJobsBy);
      };

  window.referall.JobsBoard = JobsBoard;
}).call(this);
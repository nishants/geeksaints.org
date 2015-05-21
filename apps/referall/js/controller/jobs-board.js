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

      render = function ($page, cards) {
        addToPage($page, cards);
        $page.show();
        return cards;
      },

      cards = [], //TODO fails if cards is declared inside constructor

      clearAll = function (cards) {
        cards.forEach(function (jobCard) {
          jobCard.remove();
        });
      },

      JobsBoard = function ($page, jobs) {
        JobCard = referall.JobCard;

        var filterJobsBy = function () {
              var filter = readFilter();
              if (renderingNeededFor(filter)) {
                clearAll(cards);
                jobs = jobs.selectBy(filter);
                cards = toCards(jobs.list());
                render($page, cards);
              }
            };

        cards = toCards(jobs.list());
        render($page, cards);

        $locationFilter().on("blur", filterJobsBy);
        $employerFilter().on("blur", filterJobsBy);
        $roleFilter().on("blur", filterJobsBy);
      };

  window.referall.JobsBoard = JobsBoard;
}).call(this);
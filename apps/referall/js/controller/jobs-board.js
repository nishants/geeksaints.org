(function () {
  "use-strict"

  var
      JobCard,

      $jobsListIn = function ($page) {
        return $page.find("#jobs-list");
      },

      clear = function ($filter) {
        $filter.val("");
      },

      textIn = function (input) {
        return $(input).val()
      },
      $clearButtonOf = function($filterInput){
        return $filterInput.next();
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

      clearAll = function (cards) {
        cards.forEach(function (jobCard) {
          jobCard.remove();
        });
      },

      $locationsList = function(){return $("#locations-options")},

      setOptions = function (options, $list) {
        $list.find("options").remove();
        options.forEach(function(option){
          $list.append('<option value="<value>">'.replace('<value>', option));
        })
      },

      JobsBoard = function ($page, jobs) {
        JobCard = referall.JobCard;
        var
            cards = toCards(jobs.list()),
            filterJobs = function () {
              clearAll(cards);
              jobs = jobs.selectBy(readFilter());
              cards = toCards(jobs.list());
              render($page, cards);
            };

        render($page, cards);

        setOptions(jobs.currentLocations(), $locationsList());

        $locationFilter().on("blur", filterJobs);
        $employerFilter().on("blur", filterJobs);
        $roleFilter().on("blur", filterJobs);

        $clearButtonOf($roleFilter()).on("mousedown", function(){
          clear($roleFilter());
          filterJobs();
        });

        $clearButtonOf($employerFilter()).on("mousedown", function(){
          clear($employerFilter());
          filterJobs();
        });

        $clearButtonOf($locationFilter()).on("mousedown", function(){
          clear($locationFilter());
          filterJobs();
        });

      };

  window.referall.JobsBoard = JobsBoard;
}).call(this);
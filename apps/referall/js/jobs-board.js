(function () {
  "use-strict"

  var getLocation = function(){return $("#filter-by-location");},
      JobsBoard = function ($page, jobs, JobCard) {
        var
            cards = [],
            createCardsFor = function (jobs) {
              jobs.list().forEach(function (job) {
                var jobsCard = new JobCard(job);
                cards.push(jobsCard);
                jobsCard.appendTo($page);
              })
            },
            removeCards = function(){
              cards.forEach(function(jobCard){
                jobCard.remove();
              });
            },

            onFilterByLocation = function () {
              removeCards();
              return new JobsBoard(
                  $page,
                  jobs.filterByLocation(getLocation().val()),
                  JobCard);
            };

        createCardsFor(jobs);
        getLocation().on("blur", onFilterByLocation);
        $page.show();
      };

  window.referall.JobsBoard = JobsBoard;
}).call(this);
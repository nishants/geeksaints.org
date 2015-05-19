(function () {
  "use-strict"

  var
      JobsBoard = function ($page, jobs) {
        var createCardsFor = function (jobs) {
          jobs.forEach(function(job){
            var jobsCard = new referall.JobCard(job);
            jobsCard.appendTo($page);
          })
        };

        createCardsFor(jobs);
        $page.show();
      };

  window.referall.JobsBoard = JobsBoard;
}).call(this);
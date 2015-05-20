(function () {
  "use-strict"

  var
      JobsBoard = function ($page, jobs, JobCard) {
        var createCardsFor = function (jobs) {
          jobs.forEach(function(job){
            var jobsCard = new JobCard(job);
            jobsCard.appendTo($page);
          })
        };

        createCardsFor(jobs);
        $page.show();
      };

  window.referall.JobsBoard = JobsBoard;
}).call(this);
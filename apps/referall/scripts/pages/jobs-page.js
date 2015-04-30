
(function() {
  'use strict';

  var JobsPage = function(jobsRepository, views){
    var referJob = function(jobId){
      // prepare state params string
      // navigator.redirect to linkedin
    };

    this.render = function(params){
      var view = views.jobsPage(); //dom decides whether to fetch element form dom or cached reference
      view.onJobRefer(referJob);
      params["_data" ] = jobsRepository.allJobs() ;
      view.render(params);
      view.onReferJobs();
    };

  };



  window.referall.JobsPage = JobsPage;
}).call(this);
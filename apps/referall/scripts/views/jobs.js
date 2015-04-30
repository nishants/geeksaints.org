
(function() {
  'use strict';
  geeksaints.pages("#job-id", function JobsPage(data){
    this.jobs = this.byClass("job");

  });

  window.referall.JobsPage = JobsPage;
}).call(this);
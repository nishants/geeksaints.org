(function () {
  "use-strict"

  var filterByLocation = function (jobs, location) {
    var filtered = [];
    jobs.forEach(function(job){
      if(job.location.toLowerCase() == location.toLowerCase()){
        filtered.push(job);
      }
    });
    return filtered;
  };

  var Jobs = function(jobs){
    this.list = function(){return jobs;};
    this.filterByLocation = function(location){
      return new Jobs(filterByLocation(jobs, location));
    };
  };

  window.referall.Jobs = Jobs;
}).call(this);
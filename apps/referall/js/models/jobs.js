(function () {
  "use-strict"

  var filterByLocation = function (jobs, location) {
    var filtered = [];
    jobs.forEach(function (job) {
      if (job.location.toLowerCase() == location.toLowerCase()) {
        filtered.push(job);
      }
    });
    return filtered;
  };

  var Jobs = function (jobs) {
    var filtered = jobs;

    this.list = function () {
      return filtered;
    };

    this.filterByLocation = function (location) {
      filtered = filterByLocation(jobs, location);
      return this;
    };
  };

  window.referall.Jobs = Jobs;
}).call(this);
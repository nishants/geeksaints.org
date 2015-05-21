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
      },
      filterByEmployer = function (jobs, employer) {
        var filtered = [];
        jobs.forEach(function (job) {
          if (job.employer.toLowerCase() == employer.toLowerCase()) {
            filtered.push(job);
          }
        });
        return filtered;
      },
      filterByRole = function (jobs, role) {
        var filtered = [];
        jobs.forEach(function (job) {
          if (job.role.toLowerCase() == role.toLowerCase()) {
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

    this.filterByEmployer = function (employer) {
      filtered = filterByEmployer(jobs, employer);
      return this;
    };

    this.filterByRole = function (role) {
      filtered = filterByRole(jobs, role);
      return this;
    };
  };

  window.referall.Jobs = Jobs;
}).call(this);
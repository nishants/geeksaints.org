(function () {
  "use-strict"

  var
        equals = function (str1, str2) {
          return str1.toLowerCase() == str2.toLowerCase();
        }
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

    this.selectBy = function (filter) {
      filtered = [];
      jobs.forEach(function (job) {
        var matches =
            (!filter.location || equals(job.location, filter.location)) &&
            (!filter.employer || equals(job.employer, filter.employer)) &&
            (!filter.role     || equals(job.role, filter.role));
        if (matches) {
          filtered.push(job);
        }
      });
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
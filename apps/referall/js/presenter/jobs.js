(function () {
  "use-strict"

  var
      equals = function (str1, str2) {
        return str1.toLowerCase() == str2.toLowerCase();
      },

      JobsView = function (jobs) {
        var filtered = jobs;

        this.list = function () {
          return filtered;
        };

        this.currentLocations = function(){
          var locations=[],
              locationsSet = {};
          filtered.forEach(function (job) {
            locationsSet[job.location] = "";
          });
          for(var location  in locationsSet){
            locations.push(location);
          }
          return locations;
        };

        this.selectBy = function (filter) {
          filtered = [];
          jobs.forEach(function (job) {
            var matches =
                (!filter.location || equals(job.location, filter.location)) &&
                (!filter.employer || equals(job.employer, filter.employer)) &&
                (!filter.role || equals(job.role, filter.role));
            if (matches) {
              filtered.push(job);
            }
          });
          return this;
        };
      };

  window.referall.JobsView = JobsView;
}).call(this);
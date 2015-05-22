(function () {
  "use-strict"

  var
      contains = function (string, subsring) {
        return string.toLowerCase().trim().startsWith(subsring.toLowerCase());
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
        
        this.currentEmployers = function(){
          var employers=[],
              employersSet = {};
          filtered.forEach(function (job) {
            employersSet[job.employer] = "";
          });
          for(var employer  in employersSet){
            employers.push(employer);
          }
          return employers;
        };
        
        this.currentRoles = function(){
          var roles=[],
              rolesSet = {};
          filtered.forEach(function (job) {
            rolesSet[job.role] = "";
          });
          for(var role  in rolesSet){
            roles.push(role);
          }
          return roles;
        };

        this.selectBy = function (filter) {
          filtered = [];
          jobs.forEach(function (job) {
            var matches =
                (!filter.location || contains(job.location, filter.location)) &&
                (!filter.employer || contains(job.employer, filter.employer)) &&
                (!filter.role || contains(job.role, filter.role));
            if (matches) {
              filtered.push(job);
            }
          });
          return this;
        };
      };

  window.referall.JobsView = JobsView;
}).call(this);
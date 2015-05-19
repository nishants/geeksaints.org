(function () {
  "use-strict"

  var
      newCard = function(){
         var $e = $("#job-card-prototype").clone();
        $e.attr("id", Math.random() *1000);
        return $e;
      };

      JobCard = function (job) {
        var $e = newCard(),
            setDate = function (date) {
              ($e).find(".job-date").html(date);
            },
            setUrl = function (url) {
              ($e).find(".job-date").html(url);
            },
            setHeading = function (head) {
              ($e).find(".job-heading").html(head);
            },
            setLocation = function (location) {
              ($e).find(".job-location").html(location);
            },
            setEmployer = function (emp) {
              ($e).find(".job-employer").html(emp);
            };

        setDate(job.date);
        setEmployer(job.employer);
        setHeading(job.heading);
        setLocation(job.location);
        setUrl(job.url);
        this.appendTo = function($to){
          $to.append($e);
        };
      };

  window.referall.JobCard = JobCard;
}).call(this);
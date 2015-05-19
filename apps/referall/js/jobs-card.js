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
            setUrl = function (date) {
              ($e).find(".job-date").html(date);
            },
            setHeading = function (date) {
              ($e).find(".job-heading").html(date);
            },
            setLocation = function (date) {
              ($e).find(".job-location").html(date);
            },
            setEmployer = function (date) {
              ($e).find(".job-employer").html(date);
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
(function () {
  "use-strict"

  var
      months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
      ],

      newCard = function () {
        var $e = $("#job-card-prototype").clone();
        $e.attr("id", Math.random() * 1000);
        return $e;
      },

      toDateString = function (str) {
        var date = new Date(parseInt(str));
        return months[date.getMonth()] + " " + date.getDate();
      },

      JobCard = function (job) {
        var $e = newCard(),
            setDate = function (date) {
              ($e).find(".job-date").html(date);
            },
            setUrl = function (url) {
              //  TODO
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

        setDate(toDateString(job.time));
        setEmployer(job.employer);
        setHeading(job.role);
        setLocation(job.location);
        setUrl(job.url);

        this.remove = function () {
          $e.remove();
        };

        this.appendTo = function ($to) {
          $to.append($e);
        };
      };

  window.referall.JobCard = JobCard;
}).call(this);
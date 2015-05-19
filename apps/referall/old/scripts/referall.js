(function() {
  'use strict';

  var referall = {};
  referall.refer = function(jobNumber){
    var response_type = "code",
        client_id = "75bhjbeib8ljx4",
        redirect_uri = "http://www.geeksaints.org/apps/referall",
        state = "view_refer-job_job-id-"+jobNumber+"_origin-linkedin",
        scope = "r_network r_basicprofile r_contactinfo r_emailaddress r_fullprofile r_network rw_company_admin rw_groups rw_nus w_messages w_share";

    redirect_uri = redirect_uri
    redirect_uri = encodeURI(redirect_uri);
    scope = encodeURI(scope);
    redirect_uri = encodeURI(redirect_uri);
    state = encodeURI(state);

    var url = "https://www.linkedin.com/uas/oauth2/authorization?"
            + "response_type=" + response_type
            + "&client_id=" + client_id
            + "&redirect_uri=" + redirect_uri
            + "&state=" + state
            + "&scope=" +scope
        ;
    window.location.href = url;
  };

  window.referall = referall
}).call(this);
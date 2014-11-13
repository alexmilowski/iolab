
function UserFetch(service) {
   this.service = service;
}

UserFetch.prototype.fetch = function(userid,responseHandler) {
   var request = new XMLHttpRequest();
   request.onreadystatechange = function() {
      if (request.readyState == 4) {
         if (responseHandler) {
            setTimeout(function() {
               responseHandler(request.status,request.status==200 ? JSON.parse(request.responseText) : null);
            },1);
         }
      }
   }
   request.open("GET",this.service+"user/"+userid,true);
   request.send();
}


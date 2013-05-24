$(document).ready(function(){
  setInterval(function(){
    $.get("/finger_data", function(resp){
      $("#data").html(resp);
    });
  }, 500)
});

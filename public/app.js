$(document).ready(function(){
  function getResults(arr){
    var query = _.map(arr, function(x){
      if(x === "A1") return "1";
      else if(x === "A2") return "2";
      else if(x === "A4") return "3";
      else if(x === "A5") return "4";
    }).join("");
    return _.sortBy(Dictionary[query], function(x){return -1*x[1]});
  };
  window.stack = [];
  setInterval(function(){
    $.get("/finger_data", function(resp){
      var parse_response = JSON.parse(resp);
      //$("#data").html(parse_response);
      if(_.filter(parse_response, function(x){return x[0] === window.current_selection && x[1] === "straight!"}).length > 0){
              // If the current selection (which was bent) is now straight, then allow for it to be selected again
              current_selection = null;
      }
      var selected = _.sortBy(_.filter(parse_response, function(x){return x[1] == "bent!"}), 
        function(x){return 1*x[2]})[0];
      if(selected && selected.length > 0){
        if(selected[0] === "A0"){
          if(window.last_enter !== null){
            console.log(window.last_enter.results);
            var index = window.last_enter.index,
                results = window.last_enter.results;
            $('#text').children().last().html(results[index][0]);
            $('#word_list').html("");
            $('#letters').html("");
            _.each(_.first(results,10), function(x,i){
              var extra = "";
              if(i === index){
                extra = "<div id='idx'>></div>";
              }
              $('#word_list').append("<div class='word'>"+x[0]+extra+"</div>");
            });
            if(index+1 >= 10 || index+1 >= results.length){
              index = -1;
            }
            window.last_enter = {query:window.last_enter.query, results:results, index:index+1}; 
          }
          else{
            var query = _.map(window.stack, function(x){
              if(x === "A1") return "1";
              else if(x === "A2") return "2";
              else if(x === "A4") return "3";
              else if(x === "A5") return "4";
            }).join("");
            var results = _.sortBy(Dictionary[query], function(x){return -1*x[1]});
            window.stack = [];
            window.current_selection = null;
            $('#text').append("<span class='word'>"+results[0][0]+"</span>");
            $('#letters').html("");
            $('#word_list').html("");
            _.each(_.first(results,10), function(x,i){
              var extra = "";
              if(i === 0){
                extra = "<div id='idx'>></div>";
              }
              $('#word_list').append("<div class='word'>"+x[0]+extra+"</div>");
            });
            window.last_enter = {query:query, results:results, index:1}; 
          }
        }
        else if(selected[0] === window.current_selection){
          window.last_enter = null;
        }
        else{
          window.stack.push(selected[0]);
          var query = _.map(window.stack, function(x){
            if(x === "A1") return "1";
            else if(x === "A2") return "2";
            else if(x === "A4") return "3";
            else if(x === "A5") return "4";
          }).join("");
          var results = _.sortBy(Dictionary[query], function(x){return -1*x[1]});
          $('#word_list').html("");
          _.each(_.first(results,10), function(x,i){
            var extra = "";
            if(i === 0){
              extra = "<div id='idx'>></div>";
            }
            $('#word_list').append("<div class='word'>"+x[0]+extra+"</div>");
          });
          $('#letters').append("<div class='letter "+selected[0]+"'>"+selected[0]+"</div>");
          $(".sec."+selected[0]).fadeIn(100).fadeOut(100).fadeIn(100);
          console.log(selected[0]);
          window.current_selection = selected[0];
          window.last_enter = null;
        }
      }
    });
  }, 500)
  
});

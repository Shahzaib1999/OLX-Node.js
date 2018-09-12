//CODE FOR THE SEARCH RESULTS XHR
var showResults = debounce(function (arg) {
  var value = arg.trim();
  if (value == "" || value.length <= 0) {
    $("#search-results").fadeOut();
    return;
  } else {
    $("#search-results").fadeIn();
  };
  var jqxhr = $.get('/ideas/search?q=' + value, function (data) {
      $("#search-results").html("");
    })
    .done(function (data) {
      if (data.length === 0) {
        $("#search-results").append('<p class="lead text-center mt-2">No results</p>');
      } else {
        console.table(data);
        $("#search-results").append('<p class="text-center m-0 lead">Stores</p>');
        data.forEach(x => {
          $("#search-results").append('<a href="#"><p class="m-2 mt-0 lead"><img style="width:60px;" src="images/supreme1.jpg" > ' + x.storeName + '</p> </a>');
        });
      }
    })
    .fail(function (err) {
      console.log(err);
    })
}, 300);


function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
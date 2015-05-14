$(document).ready(function(){

  function loadData() {
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

          // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

          // load streetview

    var userStreet = $(this).closest("form").find("#street").val();
    var userCity = $(this).closest("form").find("#city").val();
    var address = userStreet + ", " + userCity;

    $greeting.text("So you want to live at " + address);

    var userImg = "https://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + address + '"';

    $body.append("<img class='bgimg' src='" + userImg + "'>");

    var nyapikey = "&api-key=6560856d8bbe542db6ebb56e6177f486:14:72075154";
    var nyTimesapiurl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + userCity + nyapikey;
          // [q=search term&fq=filter-field:(filter-term)&additional-params=values]&api-key=####

    $.getJSON(nyTimesapiurl, function(data){
      console.log(data);
      var items = [];
      //iterate through JSON object geting snippet and headline/main and web url
      $.each(data.responce.docs, function (i , item ){
        console.log(i.snippet);
      });
      items.push()
    });
          //YOUR CODE GOES HERE!
 //responce/docs/0/ snippet web url headline/main
    return false;
  };

    $("#submit-btn").on("click", function(){
        $('#form-container').submit(loadData);
      });

});
// loadData();

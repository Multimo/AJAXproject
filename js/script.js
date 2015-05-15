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

    var userImg = "https://maps.googleapis.com/maps/api/streetview?size=640x400&location=" + address + '"';

    $body.append("<img class='bgimg' src='" + userImg + "'>");

    var nyapikey = "&api-key=6560856d8bbe542db6ebb56e6177f486:14:72075154";
    var nytApiUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + userCity + nyapikey;
          // [q=search term&fq=filter-field:(filter-term)&additional-params=values]&api-key=####
    var nytTemplate = "<h3><a href={{web_url}}>{{headline.main}}</a></h3>" + "<article>{{snippet}}</acticle>";
    //template for nytimes articles, items in curly bars are objects in JSON tree

    // $.ajax({
    //   dataType: "json",
    //   url: nytApiUrl,
    //   data: data,
    //   success: function(data){
    //       console.log("api is sending");
    //         $nytHeaderElem.text("New York Times Articles about" + userCity);
    //
    //         //iterate through JSON object geting snippet and headline/main and web url
    //         $.each(data.response.docs ,function (index , value ){
    //             //uses mustache to render to page
    //             $nytElem.append(Mustache.render(nytTemplate ,value));
    //         })
    //   },
    //   error: function(){$nytHeaderElem.text("Sorry the New York Times Articles about" + userCity + "cannot load");}
    // });

    $.getJSON(nytApiUrl, function(nytdata){

          $nytHeaderElem.text("New York Times Articles about " + userCity);

          //iterate through JSON object geting snippet and headline/main and web url
          $.each(nytdata.response.docs ,function (index , value ){
              //uses mustache to render to page
              $nytElem.append(Mustache.render(nytTemplate ,value));
          });
    }).error(function(){
      $nytHeaderElem.text("Sorry the New York Times Articles about " + userCity + " could not load");
    });


    var wikiRequestTimeout = setTimeout(function(){
      $wikiElem.text("Failed to load Wikipedia articles")
    }, 8000); // adds message to wiki div if load takes more than 8 seconds
    var wikiUrl = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + userCity +
    "&format=json&callback=wikiCallback";
    var wikiTemplate =  "<li><a href='http://en.wikipedia.org/wiki/{{.}}'> {{.}}</a></li>"
    //ajax request for wikipedia links
    $.ajax({
      dataType: "jsonp",
      // jsonp: "callback",
      url: wikiUrl,
      success: function (wikidata){
        $.each(wikidata[1], function (index, value){
          $wikiElem.append(Mustache.render(wikiTemplate, value));
        });
      clearTimeout(wikiRequestTimeout);

        // $wikiElem.append();
      }

      //instagram goes below here. needs to take place data run it against googlemaps api to get long and lat
      //then request all photos with long and lat from instragram
      //then append them into a gallery

    });
    return false;
  }
  $("#submit-btn").on("click", function(){
    $('#form-container').submit(loadData);
    //should add a function to remove button and add a loading spinner
  });
});

      //waits till pages is loaded and actives on submit
// loadData();

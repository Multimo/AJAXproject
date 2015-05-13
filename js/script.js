
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

 

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

// loadData();

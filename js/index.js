var API_KEY = "ee76dc6a34a367524fd7e50bf93920cb";
var cel = false;
var fc;
//
  function displayTemp(fTemp, c){
    if(c) return Math.round((fTemp - 32) * (5/9)) + "&deg; C";
    return Math.round(fTemp) + "&deg; F";
  }
//
function render(fc, cel){    
      var currentLocation = fc.name;
      var currentWeather = fc.weather[0].description;
      var currentTemp = displayTemp(fc.main.temp, cel);
      var high = Math.round(fc.main.temp_max);
      var low = Math.round(fc.main.temp_low);
      var icon = fc.weather[0].icon;
      
      $('#currentLocation').html(currentLocation);
      $('#currentTemp').html(currentTemp);
      $('#currentWeather').html(currentWeather);
      
      var iconSrc = "https://openweathermap.org/img/w/" + icon + ".png";
      $('#currentTemp').prepend('<img src="'+ iconSrc + '">');
}
//
$(function() {
  var loc;
  $.getJSON('https://ipinfo.io', function(d) {
    console.log("assigning the data...")
    loc = d.loc.split(",");
    console.log(loc);

    $.getJSON('https://api.openweathermap.org/data/2.5/weather?units=imperial&lat='+ loc[0] +'&lon='+loc[1]+'&APPID='+API_KEY, function(api_Data) {
      fc = api_Data;
      
      render(api_Data, cel);
      
      $('#toggle').click(function(){
      cel = !cel;
      render(api_Data, cel);
      })
    
    })
  
  })

})
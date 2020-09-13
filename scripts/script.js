let APIKey = "5c178ef223e7b2e7f72ca653df149189";
let city;
let prevCities = []
console.log(prevCities)

let currentDate = moment().format(" Do MMMM");
let now = moment().format("HH:MM")
let nowUnix = moment().format("X")

console.log(nowUnix);
let localCity = localStorage.getItem("city")
let queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+localCity+"&appid=" + APIKey;
let lat;
let lon;
let UtC;
let queryURI;

$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);
    lon=response.coord.lon
    console.log(lon);
    lat=response.coord.lat
    console.log(lon);

    // Transfer content to HTML
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".currentDay").text("-------- "+currentDate+" --------");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    
    // Convert the temp to fahrenheit
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;

    // add temp content to html
    $(".temp").text("Temperature (K) " + response.main.temp);
    $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

          secondQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=17ffeabcb0395a48b5f63a70619d8c8e";
        $.ajax({
            url: secondQueryURL,
            method: "GET"
          })
            .then(function(response) {
              var uvIndex = response.current.uvi;
              $("#uvSpan").text("UV Index: "+response.current.uvi);
              if (uvIndex < 6) {
                $("#uvSpan").addClass("uvGreen");
              } else if (uvIndex > 6 && uvIndex < 8) {
                $("#uvSpan").addClass("uvYellow");
              } else if (uvIndex >= 8) {
                $("#uvSpan").addClass("uvRed");
              }

    });
});


// Here we are building the URL we need to query the database
    
  // This function handles events where one button is clicked
$("#add-city").on("click", function(event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();

    // This line grabs the input from the textbox
    city = $("#city-input").val().trim();
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=" + APIKey;

    
    
  $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".currentDay").text("-------- "+currentDate+" --------");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        
        // Convert the temp to fahrenheit
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // add temp content to html
        $(".temp").text("Temperature (K) " + response.main.temp);
        $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);

        if(jQuery.inArray(city, prevCities) != -1) {
          console.log("is in array");
          return
      } else {
        $("#history").empty();
        prevCities.unshift(city)
        localStorage.setItem("city",city)
        if (prevCities.length > 5) {
          prevCities.pop()
        }
      }
      for (let i = 0; i < prevCities.length; i++) {
        $("#history").append("<p class='cityClass'>"+prevCities[i]+"</p>");
        console.log(prevCities)
      }
      $(".cityClass").on("click", function(event) {
        cityHist(event)
      });

       
});
            
});

function cityHist(event) {
            
          
  // Preventing the buttons default behavior when clicked (which is submitting a form)
  event.preventDefault();
  console.log(event.currentTarget.textContent)
  // This line grabs the text from the history  column (FH = from history)
  let cityFH = event.currentTarget.textContent;
  let queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityFH+"&appid=" + APIKey;
  //console.log(quer)

  
  
$.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {

      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);

      // Transfer content to HTML
      $(".city").html("<h1>" + response.name + " Weather Details</h1>");
      $(".currentDay").text("-------- "+currentDate+" --------");
      $(".wind").text("Wind Speed: " + response.wind.speed);
      $(".humidity").text("Humidity: " + response.main.humidity);
      
      // Convert the temp to fahrenheit
      let tempF = (response.main.temp - 273.15) * 1.80 + 32;

      // add temp content to html
      $(".temp").text("Temperature (K) " + response.main.temp);
      $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + tempF);
      localStorage.setItem("city",city)





});

 
} ;

    

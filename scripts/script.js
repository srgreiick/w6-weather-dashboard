let APIKey = "5c178ef223e7b2e7f72ca653df149189";
let city;
let prevCities = []

let currentDate = moment().format(" Do MMMM");
let now = moment().format("HH:MM")
let nowUnix = moment().format("X")


let localCity = localStorage.getItem("city")
let queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+localCity+"&appid=" + APIKey;
let lat;
let lon;
let UtC;
let queryURI;
let uvIndex;

$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {


    // Log the resulting object

    lon=response.coord.lon
    
    lat=response.coord.lat
    

    // Transfer content to HTML
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".currentDay").text("-------- "+currentDate+" --------");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity+"%");
    
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
              uvIndex = response.current.uvi;
              $("#uvSpan").text(response.current.uvi);
              $("#uvSpan").removeClass();
              if (uvIndex < 6) {
                $("#uvSpan").addClass("uvGreen");
              } else if (uvIndex > 6 && uvIndex < 8) {
                $("#uvSpan").addClass("uvYellow");
              } else if (uvIndex >= 8) {
                $("#uvSpan").addClass("uvRed");
              }
              $(".card-body").empty()  
              for (let i = 0; i < 5; i++) {
console.log(response.daily[i]); 
let tempFar = ((response.daily[i].temp.day - 273.15) * 1.80 + 32).toFixed(0);
  let day = 1000*(response.daily[i].dt)
  let cday = new Date(day)
  let human = cday.toLocaleString("en-US",{weekday:"long"})
  
  console.log(human);
  uvI = response.daily[i].uvi;
            
  $(".card-body").append(`<div class="card card_${i}">
  <h3>${human}</h3>
  <div class="humidity">${response.daily[i].humidity}%</div>
  <div class="tempF">${tempFar} F</div>
  <div id="uvIndex">UV index: <span style="padding: 2px;" id="uvSpan_${i}"></span></div>
  </div>`)
  $("#uvSpan_"+i+"").text(response.daily[i].uvi);
  $("#uvSpan_"+i+"").removeClass();
  if (uvI < 6) {
    $("#uvSpan_"+i+"").addClass("uvGreen");
  } else if (uvI > 6 && uvI < 8) {
    $("#uvSpan_"+i+"").addClass("uvYellow");
  } else if (uvI >= 8) {
    $("#uvSpan_"+i+"").addClass("uvRed");
  }

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



        // Transfer content to HTML
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".currentDay").text("-------- "+currentDate+" --------");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity+"%");
        
        // Convert the temp to fahrenheit
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // add temp content to html
        $(".temp").text("Temperature (K) " + response.main.temp);
        $(".tempF").text("Temperature (F) " + tempF.toFixed(2));


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
      }
      $(".cityClass").on("click", function(event) {
        cityHist(event)
      });
          console.log(response);
    lon=response.coord.lon
    
    lat=response.coord.lat
    
          secondQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=17ffeabcb0395a48b5f63a70619d8c8e";
        $.ajax({
            url: secondQueryURL,
            method: "GET"
          })
            .then(function(response) {
              uvIndex = response.current.uvi;
              $("#uvSpan").text(response.current.uvi);
              $("#uvSpan").removeClass();
              if (uvIndex < 6) {
                $("#uvSpan").addClass("uvGreen");
              } else if (uvIndex > 6 && uvIndex < 8) {
                $("#uvSpan").addClass("uvYellow");
              } else if (uvIndex >= 8) {
                $("#uvSpan").addClass("uvRed");
              }
              $(".card-body").empty()  
              for (let i = 0; i < 5; i++) {
console.log(response.daily[i]); 
let tempFar = ((response.daily[i].temp.day - 273.15) * 1.80 + 32).toFixed(0);
  let day = 1000*(response.daily[i].dt)
  let cday = new Date(day)
  let human = cday.toLocaleString("en-US",{weekday:"long"})
  
  console.log(human);
  uvI = response.daily[i].uvi;
            
  $(".card-body").append(`<div class="card card_${i}">
  <h3>${human}</h3>
  <div class="humidity">${response.daily[i].humidity}%</div>
  <div class="tempF">${tempFar} F</div>
  <div id="uvIndex">UV index: <span style="padding: 2px;" id="uvSpan_${i}"></span></div>
  </div>`)
  $("#uvSpan_"+i+"").text(response.daily[i].uvi);
  $("#uvSpan_"+i+"").removeClass();
  if (uvI < 6) {
    $("#uvSpan_"+i+"").addClass("uvGreen");
  } else if (uvI > 6 && uvI < 8) {
    $("#uvSpan_"+i+"").addClass("uvYellow");
  } else if (uvI >= 8) {
    $("#uvSpan_"+i+"").addClass("uvRed");
  }

              }
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
      $(".humidity").text("Humidit y: " + response.main.humidity);
      
      // Convert the temp to fahrenheit
      let tempF = (response.main.temp - 273.15) * 1.80 + 32;

      // add temp content to html
      $(".temp").text("Temperature (K) " + response.main.temp);
      $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

      // Log the data in the console as well
      localStorage.setItem("city",city)

      lon=response.coord.lon
      
      lat=response.coord.lat
      
            secondQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=17ffeabcb0395a48b5f63a70619d8c8e";
          $.ajax({
              url: secondQueryURL,
              method: "GET"
            })
              .then(function(response) {
                uvIndex = response.current.uvi;
                $("#uvSpan").text(response.current.uvi);
                $("#uvSpan").removeClass();
                if (uvIndex < 6) {
                  $("#uvSpan").addClass("uvGreen");
                } else if (uvIndex > 6 && uvIndex < 8) {
                  $("#uvSpan").addClass("uvYellow");
                } else if (uvIndex >= 8) {
                  $("#uvSpan").addClass("uvRed");
                }
                $(".card-body").empty()  
              for (let i = 0; i < 5; i++) {
console.log(response.daily[i]); 
let tempFar = ((response.daily[i].temp.day - 273.15) * 1.80 + 32).toFixed(0);
  let day = 1000*(response.daily[i].dt)
  let cday = new Date(day)
  let human = cday.toLocaleString("en-US",{weekday:"long"})
  
  console.log(human);
  uvI = response.daily[i].uvi;
            
  $(".card-body").append(`<div class="card card_${i}">
  <h3>${human}</h3>
  <div class="humidity">${response.daily[i].humidity}%</div>
  <div class="tempF">${tempFar} F</div>
  <div id="uvIndex">UV index: <span style="padding: 2px;" id="uvSpan_${i}"></span></div>
  </div>`)
  $("#uvSpan_"+i+"").text(response.daily[i].uvi);
  $("#uvSpan_"+i+"").removeClass();
  if (uvI < 6) {
    $("#uvSpan_"+i+"").addClass("uvGreen");
  } else if (uvI > 6 && uvI < 8) {
    $("#uvSpan_"+i+"").addClass("uvYellow");
  } else if (uvI >= 8) {
    $("#uvSpan_"+i+"").addClass("uvRed");
  }

              }
              });    



});

 
} ;

    

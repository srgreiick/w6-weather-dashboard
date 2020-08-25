let APIKey = "5c178ef223e7b2e7f72ca653df149189";

// Here we are building the URL we need to query the database
    
            // This function handles events where one button is clicked
            $("#add-movie").on("click", function(event) {
              // Preventing the buttons default behavior when clicked (which is submitting a form)
              event.preventDefault();
              // This line grabs the input from the textbox
              let movie = $("#city-input").val().trim();
      
              // Adding the movie from the textbox to our array
              
      
              // Calling renderButtons which handles the processing of our movie array
              renderButtons();
      
            });
            
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
        });



  

  //--------------------------------------------------------------------------------------------------------------------

  
        // Function for displaying the movie info
        // We're adding a click event listener to all elements with the class "movie"
        // We're adding the event listener to the document because it will work for dynamically generated elements
        // $(".movies").on("click") will only add listeners to elements that are on the page at that time
        $(document).on("click", ".movie", alertMovieName);
  
        // Calling the renderButtons function to display the initial buttons
        renderButtons();
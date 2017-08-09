let imageContainer = document.querySelector(".poop")
let inputNode = document.querySelector(".inputField")
inputNode.addEventListener("keydown", function(event) {
  // Wait for input to == ENTER
  if (event.keyCode === 13) {
    // Clear the results on the page with "..."
    imageContainer.textContent = "...";
    // Store what is in the input field into a variable
    let resultValue = event.target.value
    // Start the fetch but concatenate the resultValue at the end of the URL
    fetch(`http://recipepuppyproxy.herokuapp.com/api/?i=${resultValue}`)
      // Take the response then
      .then(function(response) {
        // Convert it into Json
        return response.json()
      })
      //Run function from previous then
      .then(function(parsed) {
        //clear out text for previous results
        imageContainer.textContent = "";
        //console.log("parsed", parsed)
        //loop over array
        for (var i = 0; i < parsed.results.length; i++) {
          //put exact array content into variables to be used later
          const thumbnail = parsed.results[i].thumbnail
          const href = parsed.results[i].href
          const title = parsed.results[i].title
          const ingredients = parsed.results[i].ingredients
          //make template to be used for each result
          const template = `
          <div class="recipe">
            <h3>${title}</h3>
            <img src="${thumbnail}" alt="">
            <p>${ingredients}</p>
          </div>
          `
          // inserts the new child element inside but at the end of the imageContainer
          imageContainer.insertAdjacentHTML('beforeEnd', template)
        }
      })
  }
})

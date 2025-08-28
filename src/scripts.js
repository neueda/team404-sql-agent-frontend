function give_feedback() {
    //print the user's query back to the page for verification
    const userInput = document.getElementById("user_input").value;
    //console.log(userInput)
    const feedback_element = document.getElementById("feedback_element");
    if (userInput) {
      send_request(userInput)
      feedback_element.innerText = userInput;
    }
    else {
      feedback_element.innerText = "No query entered"
    }
}

async function send_request(user_input) {  
  const url = `http://localhost:8080/api/hello?query=${user_input}`; //change to actual URL when we have GC access
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const results = await response.json();
    console.log(results); //for testing and troubleshooting purposes

  } catch (error) {
    console.error(error.message);
  }
  use_response(results);
}

function use_response(result_json) {
    //placeholder - will fill the dynamic result table with data
    const table = document.getElementById("results");
    //assign values to table.innerHTML
    //one row per row in JSON
}
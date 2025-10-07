function give_feedback(agentResponse) {
  //print the user's query back to the page for verification
  const userInput = document.getElementById("user_input").value;
  //console.log(userInput)
  const feedback_text = document.getElementById("feedback_text");
  if (userInput) {
    send_request(userInput);
  } else {
    feedback_text.innerText = "No query entered";
  }
}

async function send_request(user_input) {
  //sends a http request to our backend and awaits a response
  const url = `http://localhost:8080/api/hello?query=${user_input}`;
  //const url = `https://team404-sql-agent-971987703066.europe-north1.run.app/api/hello?query=${user_input}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    
// Fetches and processes JSON response from the server.
// Displays the agent's feedback message on the page and, if film data exists,
// passes the film list to the response handler function.
    const data = await response.json();
    const films = data.JsonResultSet;
    const agentResponse = data.AgentResponse;
    const feedback_text = document.getElementById("feedback_text");
    feedback_text.innerHTML = agentResponse;
    if (film && film.length > 0) {
      use_response(films);
    }
  } catch (error) {
    console.error(error.message);
  }
}

// listens for enter key when user submits input
document.querySelector("#user_input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    give_feedback();
  }
});

function use_response(result_json) {
  //Populates the HTML Table element with JSON object.
  const headerRow = document.getElementById("Hresults");
  const tableBody = document.getElementById("results");
  const headersLoop = [
    "Film",
    "Genre",
    "Lead_Studio",
    "Audience_Score_pc",
    "Profitability",
    "Rotten_Tomatoes_pc",
    "Worldwide_Gross",
    "Year",
  ];
  const headersView = [
    "Film Name",
    "Genre",
    "Lead Studio",
    "Audience Score",
    "Profitability",
    "Rotten Tomatoes",
    "Worldwide Gross Revenue",
    "Year",
  ];

  var headhtml = "<tr>";
  for (h in headersView) {
    headhtml += `<th>${headersView[h]}</th>`;
  }
  headhtml += "</tr>";
  headerRow.innerHTML = headhtml;

  // Loop through all keys in the result_json object
  var bodyHTML = "";
  for (let row of result_json) {
    bodyHTML += "<tr>";
    for (let h of headersLoop) {
      bodyHTML += `<td>${row[h]}</td>`;
    }
    bodyHTML += "</tr>";
  }
  tableBody.innerHTML = bodyHTML;
}

function clearBtn() {
  // Clear the input field
  document.getElementById("user_input").value = "";

  // Clear feedback text
  document.getElementById("feedback_text").textContent = "";

  // Clear table headers and rows
  document.getElementById("Hresults").innerHTML = "";
  document.getElementById("results").innerHTML = "";
}

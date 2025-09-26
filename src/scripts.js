// listens for enter when user submits input
document.querySelector('#user_input').addEventListener('keydown', function (e){
  if (e.key === 'Enter') {
    give_feedback()
  }
})


function give_feedback() {
  //print the user's query back to the page for verification
  const userInput = document.getElementById("user_input").value;
  //console.log(userInput)
  const feedback_text = document.getElementById("feedback_text");
  if (userInput) {
    send_request(userInput)
    feedback_text.innerText = userInput;
  }
  else {
    feedback_text.innerText = "No query entered"
  }
}

async function send_request(user_input) {
  const url = `https://team404-sql-agent-971987703066.europe-north1.run.app/api/hello?query=${user_input}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const results = await response.json();

    use_response(results);

  } catch (error) {
    console.error(error.message);
  }
}

function use_response(result_json) {
  //Populates the HTML Table element with JSON object.
  const headerRow = document.getElementById("Hresults");
  const tableBody = document.getElementById("results");
  const headers = ["Film", "Genre", "Lead Studio", "Audience Score", "Profitability", "Rotten Tomatoes Score", "Worldwide Gross Revenue", "Year"];
  //var table = document.getElementById("table");


  var headhtml = "<tr>";
  for (h in headers){
    headhtml += `<th>${headers[h]}</th>`
  }
  headhtml += "</tr>";
  headerRow.innerHTML = headhtml

  // Loop through all keys in the result_json object
  var bodyHTML = "";
  for(row in result_json) {
    bodyHTML += "<tr>";
    for (col in result_json[row]){
      bodyHTML += `<td>${result_json[row][col]}</td>`;
    }
    bodyHTML += "</tr>";
  }
  tableBody.innerHTML = bodyHTML;

}
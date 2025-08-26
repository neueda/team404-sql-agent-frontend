function give_feedback() {
    //print the user's query back to the page for verification
    //can call the http request from another function in here later etc
    const userInput = document.getElementById("user_input").value;
    const result = document.getElementById("result");
    if (userInput) {
        result.innerText = userInput;
    }
    else {
        result.innerText = "No query entered"
    }
}
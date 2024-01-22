// const { response } = require("express");

var fullname = document.getElementById("fullname");
var email = document.getElementById("email");
var rating = document.getElementById("rating");
var message = document.getElementById("message");

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

document
  .getElementById("feedback-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const dataToSend = {
      fullname: fullname.value,
      email: email.value,
      rating: rating.value,
      message: message.value,
    };

    fetch("http://localhost:8000/api/store-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.text())
      .then((data) => {
        if (data === "Data saved successfully") {
          document.getElementById("feedback-form").reset();
          modal.style.display = "block";
        }
        console.log(data);
      })
      .catch((error) => {
        console.error("Error storing data:", error);
      });
  });

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

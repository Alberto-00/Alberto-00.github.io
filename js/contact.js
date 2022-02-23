window.addEventListener("DOMContentLoaded", function () {
  // get the form elements defined in your form HTML above

  var form = document.getElementById("contact_form_6212cd089c255");
  // var button = document.getElementById("my-form-button");
  var status = document.getElementById("status");

  // Success and Error functions for after the form is submitted

  function success() {
    form.reset();
    status.classList.add("success");
    status.innerHTML = "Thanks!";
    setTimeout(function() {
      status.classList.remove("success");
      status.innerHTML = "";
    }, 4200);
  }

  function error() {
    status.classList.add("error");
    status.innerHTML = "Oops! There was a problem.";
    setTimeout(function() {
      status.classList.remove("error");
      status.innerHTML = "";
    }, 4200);
  }

  // handle the form submission event

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = new FormData(form);

    if (data.get("name").length > 0 && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(data.get("email")) &&
    data.get("subject").length > 0 && data.get("message").length > 0)
      ajax(data, success, error);
    else
      error();
  });
});

// helper function for sending an AJAX request

function ajax(data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://formspree.io/f/xqknqjrq");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}
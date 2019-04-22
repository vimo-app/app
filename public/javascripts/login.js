(function () {

  document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("loginBtn").onclick = function (e) {

      e.preventDefault();

      var user = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
      };

      axios
        .post("/private", user)
        .then(userData => {
          window.location = window.location.origin + "/private"
        })
        .catch(error => {
          console.log(error)
        });
    };
  }, false);

})
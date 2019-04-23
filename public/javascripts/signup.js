// (function () {

//   document.addEventListener('DOMContentLoaded', () => {

//     document.getElementById("accountBtn").onclick = function (e) {

//       e.preventDefault();

//       var user = {
//         username: document.getElementById("username").value,
//         email: document.getElementById("email").value,
//         password: document.getElementById("password").value,
//         passwordConfirm: document.getElementById("passwordConfirm").value
//       };

//       axios
//         .post("/auth/signup", user)
//         .then(userData => {
//           window.location = window.location.origin + "/auth/login"
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     };
//   }, false);

// }());
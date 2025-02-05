document.addEventListener("DOMContentLoaded", function (event) {
  let sessionEmail = sessionStorage.getItem("sessionCarRentalEmailLogin");
  let sessionPassword = sessionStorage.getItem("sessionCarRentalPasswordLogin");
  let sessionExist = !!sessionEmail && !!sessionPassword;

  fetch("./src/component/Common/NavBar/navbar.html")
    .then((response) => response.text())
    .then(
      (data) => (document.getElementById("navbar-placeholder").innerHTML = data)
    );

  fetch("./src/component/Common/NavBar/LogIn/Login.html")
    .then((response) => response.text())
    .then(
      (data) => (document.getElementById("LogIn-placeholder").innerHTML = data)
    )
    .then(() => {
      var hideBtn = window.location.href.toLowerCase().includes("signin");

      var localExist =
        !!localStorage.getItem("carRentalEmailLogin") &&
        !!localStorage.getItem("carRentalPasswordLogin");

      document
        .getElementById("login")
        .classList.toggle(
          "d-none",
          (localExist && !hideBtn) ||
            (!localExist && hideBtn) ||
            (!document
              .getElementById("login")
              .classList.value.includes("d-none") &&
              hideBtn)
        );
      document
        .getElementById("logout")
        .classList.toggle(
          "d-none",
          (!localExist && !hideBtn) || (!localExist && hideBtn)
        );

      document.getElementById("login").addEventListener("click", () => {
        localStorage.removeItem("user");
        location.reload();
        window.location.href = "SignIn.html";
      });
      document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("carRentalEmailLogin");
        localStorage.removeItem("carRentalPasswordLogin");
        location.reload();
        window.location.href = "SignIn.html";
      });
    });

  if (window.location.pathname == "/SignIn.html") {
    let checked = false;

    document.getElementById("checkBox").addEventListener("click", (e) => {
      checked = e.target.checked;
    });

    if (sessionExist) {
      document.getElementById("inputEmail").value = sessionEmail;
      document.getElementById("inputPassword").value = sessionPassword;
    }

    document.getElementById("signInForm").addEventListener("submit", (e) => {
      e.preventDefault();
      emailInput = document.getElementById("inputEmail").value;
      passwordInput = document.getElementById("inputPassword").value;

      if (checked) {
        sessionStorage.setItem("sessionCarRentalEmailLogin", emailInput);
        sessionStorage.setItem("sessionCarRentalEmailLogin", passwordInput);
      }
      localStorage.setItem("carRentalEmailLogin", emailInput);
      localStorage.setItem("carRentalPasswordLogin", passwordInput);

      window.location.href = "Index.html";
    });
  }
});

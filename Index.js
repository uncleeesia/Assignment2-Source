document.addEventListener("DOMContentLoaded", function (event) {
  let sessionEmail = sessionStorage.getItem("sessionCarRentalEmailLogin");
  let sessionPassword = sessionStorage.getItem("sessionCarRentalPasswordLogin");
  let sessionExist = !!sessionEmail && !!sessionPassword;

  fetch("./src/component/Common/NavBar/navbar.html")
    .then((response) => response.text())
    .then(
      (data) => (document.getElementById("navbar-placeholder").innerHTML = data)
    )
    .then(() => {
      var hideBtn = window.location.href.toLowerCase().includes("signin");
      var localEmail = localStorage.getItem("carRentalEmailLogin");
      var localPassword = localStorage.getItem("carRentalPasswordLogin");
      var localExist = !!localEmail && !!localPassword;

      document.getElementById("name").innerHTML = localExist
        ? localEmail.split("@")[0]
        : "";

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
        localStorage.removeItem("carRentalEmailLogin");
        localStorage.removeItem("carRentalPasswordLogin");
        window.location.href = "SignIn.html";
      });
      document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("carRentalEmailLogin");
        localStorage.removeItem("carRentalPasswordLogin");
        window.location.href = "SignIn.html";
      });
    });

  if (window.location.href.toLowerCase().includes("signin")) {
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
      localStorage.setItem(
        "carRentalPasswordLogin",
        encodeURI(btoa(passwordInput))
      );

      const storedBrand = localStorage.getItem("carBrand");
      const storedModel = localStorage.getItem("carModel");

      if (emailInput.toLowerCase() == "admin@azoomcarrental.com") {
        window.location.href = "CarOptions.html?superRole=true";
      } else {
        if (storedBrand && storedModel) {
          window.location.href = `Selected.html?Brand=${storedBrand}&CarModel=${storedModel}`;
        } else {
          window.location.href = "Index.html";
        }
      }
    });
  }
});

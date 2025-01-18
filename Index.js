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
    const isLoggedIn = localStorage.getItem("user") !== null;
    const hideBtn = window.location.href.includes("SignIn.html") && !isLoggedIn;
    document.getElementById("login").classList.toggle("d-none", isLoggedIn);
    document.getElementById("logout").classList.toggle("d-none", !isLoggedIn);
    document.getElementById("login").classList.toggle("d-none",hideBtn);
    document.getElementById("login").addEventListener("click", () => {
      localStorage.removeItem("user");
      location.reload();
      window.location.href = "SignIn.html";
    });
  });

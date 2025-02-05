document.addEventListener("DOMContentLoaded", function (e) {
  const reservationForm = document.getElementById("reservation-form");
  const pickupDateInput = document.getElementById("pickup-date");
  const returnDateInput = document.getElementById("return-date");
  const creditCardInput = document.getElementById("credit-card");

  function validateReturnDate(_pickupDateInput, _returnDateInput) {
    const pickupDate = new Date(_pickupDateInput);
    const returnDate = new Date(_returnDateInput);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (returnDate < pickupDate) {
      returnDateInput.setCustomValidity(
        "Return date cannot be earlier than pickup date."
      );
      returnDateInput.reportValidity();
      return false;
    } else if (pickupDate < today) {
      pickupDateInput.setCustomValidity(
        "Pickup date cannot be earlier than today."
      );
      pickupDateInput.reportValidity();
      return false;
    } else {
      returnDateInput.setCustomValidity("");
      pickupDateInput.setCustomValidity("");
      return true;
    }
  }

  function validateCreditCard() {
    const creditCardNumber = creditCardInput.value.replace(/[\s-]/g, ""); // Remove spaces and hyphens
    const creditCardPattern = /^\d{16}$/; // 16 digits only

    if (!creditCardPattern.test(creditCardNumber)) {
      creditCardInput.setCustomValidity(
        "Please enter a valid 16-digit credit card number."
      );
      creditCardInput.reportValidity();
      return false;
    } else {
      creditCardInput.setCustomValidity("");
      creditCardInput.reportValidity();
      return true;
    }
  }

  pickupDateInput.addEventListener("change", (e) => {
    localStorage.setItem("pickupDate", e.target.value);
    var returnDate = localStorage.getItem("returnDate");
    return validateReturnDate(e.target.value, returnDate);
  });

  returnDateInput.addEventListener("change", (e) => {
    var pickupDate = localStorage.getItem("pickupDate");
    localStorage.setItem("returnDate", e.target.value);
    return validateReturnDate(pickupDate, e.target.value);
  });

  var localExist =
    !!localStorage.getItem("carRentalEmailLogin") &&
    !!localStorage.getItem("carRentalPasswordLogin");

  reservationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Prevent form submission if validation fails
    if (!validateReturnDate()) {
    } else {
      if (!localExist) {
        alert("You must be logged in to reserve a car.");
        window.location.href = "SignIn.html";
      } else {
        window.location.href = `Summary.html`;
      }
    }
  });
});

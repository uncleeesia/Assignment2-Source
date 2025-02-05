document.addEventListener("DOMContentLoaded", function () {
    const reservationForm = document.getElementById("reservation-form");
    const pickupDateInput = document.getElementById("pickup-date");
    const returnDateInput = document.getElementById("return-date");
    const creditCardInput = document.getElementById("credit-card");
  
    // Function to validate the return date
    function validateReturnDate() {
      const pickupDate = new Date(pickupDateInput.value);
      const returnDate = new Date(returnDateInput.value);
  
      if (returnDate < pickupDate) {
        returnDateInput.setCustomValidity("Return date cannot be earlier than pickup date.");
        returnDateInput.reportValidity();
        return false;
      } else {
        returnDateInput.setCustomValidity("");
        returnDateInput.reportValidity();
        return true;
      }
    }
  
    // Function to validate the credit card number
    function validateCreditCard() {
      const creditCardNumber = creditCardInput.value.replace(/[\s-]/g, ""); // Remove spaces and hyphens
      const creditCardPattern = /^\d{16}$/; // 16 digits only
  
      if (!creditCardPattern.test(creditCardNumber)) {
        creditCardInput.setCustomValidity("Please enter a valid 16-digit credit card number.");
        creditCardInput.reportValidity();
        return false;
      } else {
        creditCardInput.setCustomValidity("");
        creditCardInput.reportValidity();
        return true;
      }
    }
  
    // Event listeners for real-time validation
    pickupDateInput.addEventListener("change", validateReturnDate);
    returnDateInput.addEventListener("change", validateReturnDate);
    creditCardInput.addEventListener("input", validateCreditCard);
  
    // Form submission handler
    reservationForm.addEventListener("submit", function (event) {
      if (!validateReturnDate() || !validateCreditCard()) {
        event.preventDefault(); // Prevent form submission if validation fails
      } else {
        alert("Reservation successful! Thank you for choosing AZoom Car Rental.");
        // Here you can add code to send the form data to the server
      }
    });
  });
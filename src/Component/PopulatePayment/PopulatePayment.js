document.addEventListener("DOMContentLoaded", () => {
  const creditCardInput = document.getElementById("creditCardInput");
  const expiryCardInput = document.getElementById("expiryCardInput");
  const cvvCardInput = document.getElementById("cvvCardInput");
  const paymentForm = document.getElementById("paymentSubmission");
  const paymentAmount = document.getElementById("paymentAmount");
  const paymentImgUrl = document.getElementById("paymentImgUrl");
  const paymentCarModel = document.getElementById("paymentCarModel");
  const paymentBrand = document.getElementById("paymentBrand");
  const paymentDuration = document.getElementById("paymentDuration");
  const paymentRentalPrice = document.getElementById("paymentRentalPrice");
  const paymentInsurance = document.getElementById("paymentInsurance");
  const paymentTotalPrice = document.getElementById("paymentTotalPrice");
  const paymentDeposit = document.getElementById("paymentDeposit");

  creditCardInput.addEventListener("change", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{4})/g, "$1 ").trim();
    e.target.value = value.substring(0, 19); // Limit to 16 digits + spaces
    return validateCreditCard();
  });

  expiryCardInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4); // Auto-add slash
    }
    e.target.value = value;
  });

  var localStorageSelectedCar = JSON.parse(localStorage.getItem("selectedCar"));
  var localStoragePaymentDetail = JSON.parse(
    localStorage.getItem("paymentDetails")
  );

  paymentImgUrl.src = localStorageSelectedCar.imgUrl;
  paymentCarModel.innerHTML = localStorageSelectedCar.car;
  paymentBrand.innerHTML = localStorageSelectedCar.brand;
  paymentDuration.innerHTML = localStoragePaymentDetail.duration;
  paymentRentalPrice.innerHTML = localStorageSelectedCar.pricePerDay;
  paymentInsurance.innerHTML = `$${localStoragePaymentDetail.insurancePrice}`;
  paymentTotalPrice.innerHTML = `$${(
    parseFloat(localStoragePaymentDetail.insurancePrice) +
    parseFloat(localStoragePaymentDetail.total)
  ).toFixed(2)}`;
  paymentDeposit.innerHTML = `$${(
    parseFloat(localStoragePaymentDetail.insurancePrice) +
    parseFloat(localStoragePaymentDetail.total * 0.6)
  ).toFixed(2)}`;
  paymentAmount.innerHTML = `${(
    parseFloat(localStoragePaymentDetail.insurancePrice) +
    parseFloat(localStoragePaymentDetail.total * 0.6)
  ).toFixed(2)}`;
  paymentForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent actual form submission

    const cardNumber = creditCardInput.value.replace(/\s/g, "");
    const expiryDate = expiryCardInput.value;
    const cvv = cvvCardInput.value;

    if (!/^\d{16}$/.test(cardNumber)) {
      alert("Please enter a valid 16-digit card number.");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      alert("Please enter a valid expiry date in MM/YY format.");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      alert("Please enter a valid 3-digit CVV.");
      return;
    }

    alert(
      "Payment Successful! Amount: $" +
        document.getElementById("paymentAmount").innerText
    );
    paymentForm.reset();
    localStorage.removeItem("carBrand");
    localStorage.removeItem("carModel");
    localStorage.removeItem("carData");
    localStorage.removeItem("paymentDetails");
    localStorage.removeItem("pickupDate");
    localStorage.removeItem("returnDate");
    localStorage.removeItem("returnLocation");
    localStorage.removeItem("selectedCar");
    window.location.href = "./CarOptions.html";
  });
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
});

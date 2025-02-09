document.addEventListener("DOMContentLoaded", () => {
  const creditCardInput = document.getElementById("credit-card");
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
    console.log(e.target.value);
    return validateCreditCard();
  });
  document.getElementById("expiryDate").addEventListener("input", function (e) {
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
  paymentAmount.innerHTML = `$${(
    parseFloat(localStoragePaymentDetail.insurancePrice) +
    parseFloat(localStoragePaymentDetail.total * 0.6)
  ).toFixed(2)}`;
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

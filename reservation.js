    function validateForm() {
    let x = document.forms["register-form"]["fname"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
    let y = document.forms["register-form"]["register_phone"].value;
    if (y == "") {
      alert("phone number must be filled out");
      return false;
  }
  let z = document.forms["register-form"]["register_email"].value;
    if (z == "") {
      alert("E-mail Adress must be filled out");
      return false;
  
} let a = document.forms["register-form"]["register_ticket"].value;
if (a == "") {
  alert("seats must be filled out");
  return false;
}
let b = document.forms["register-form"]["register_date"].value;
if (b== "") {
  alert("booking date must be filled out");
  return false;
}let c = document.forms["register-form"]["register_time"].value;
if (c== "") {
  alert("booking time must be filled out");
  return false;
}
}
form = document.getElementsByTagName("form")[0];
form.addEventListener("submit", (e) => { e.preventDefault();
  alert("thank you for booking in riyadh places website!");});

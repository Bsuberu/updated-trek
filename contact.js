document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("myForm").addEventListener("submit", function (event) {
event.preventDefault();  // Prevent form from submitting immediately
if (validateForm()) {
    showModal();  // Show modal if form is valid
    // Submit form data via AJAX to prevent page reload
    let formData = new FormData(this);
    fetch('trekcontact.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);  // Log server response for debugging
        clearForm();  // Clear form after successful submission
    })
    .catch(error => console.error('Error:', error));
}
});

function validateForm() {
    let isValid = true;

    // Get form field values
    let fname = document.getElementById("fname").value.trim();
    let sname = document.getElementById("sname").value.trim();
    let entity = document.getElementById("entity").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("num").value.trim();

    // Regular expressions for validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let numberPattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

    // Clear previous error messages
    document.getElementById("msg_fn").innerText = "";
    document.getElementById("msg_sn").innerText = "";
    document.getElementById("email-error").innerText = "";
    document.getElementById("number-error").innerText = "";

    // Validate First Name
    if (fname === "") {
        document.getElementById("msg_fn").innerText = "First name is required.";
        isValid = false;
    }

    // Validate Last Name
    if (sname === "") {
        document.getElementById("msg_sn").innerText = "Last name is required.";
        isValid = false;
    }

    // Validate Email
    if (email === "" || !emailPattern.test(email)) {
        document.getElementById("email-error").innerText = "Please enter a valid email address.";
        isValid = false;
    }

    // Validate Phone Number
    if (phone === "" || !numberPattern.test(phone)) {
        document.getElementById("number-error").innerText = "Please enter a valid contact number.";
        isValid = false;
    }

    return isValid;
}

function showModal() {
    let modal = document.getElementById("confirmationModal");
    modal.style.display = "block";

    // Close modal when 'X' is clicked
    let closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    // Close modal when clicking outside the modal
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

function clearForm() {
    document.getElementById("fname").value = "";
    document.getElementById("sname").value = "";
    document.getElementById("entity").value = "";
    document.getElementById("email").value = "";
    document.getElementById("num").value = "";
    document.querySelector("textarea").value = "";
}

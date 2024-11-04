function toggleMenu() {
    const menu = document.querySelector("nav ul");
    menu.classList.toggle("active");
}
     
 document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("myForm").addEventListener("submit", function (event) {
        event.preventDefault();  // Prevent form from submitting immediately
        if (validateForm()) {
            showModal();  // Show modal if form is valid

            // Submit form data via AJAX to prevent page reload
            let formData = new FormData(this);
            fetch('trek.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                console.log(data);  // Log server response for debugging
                clearForm();  // Clear form after successful submission
                document.getElementById("confirmationModal").style.display = "none";  // Close modal after submission
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById("error-msg").innerText = "Something went wrong. Please try again.";
            });
        }
    });

function validateForm() {
        let isValid = true;

        // Get form field values
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();

        // Regular expressions for validation
        let namePattern = /^[a-zA-Z\s'-]{2,30}+$/;
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Clear previous error messages
        document.getElementById("msg_name").innerText = "";
        document.getElementById("email-error").innerText = "";

        // Validate name
        if (name === "") {
            document.getElementById("msg_name").innerText = "Please enter your name.";
            isValid = false;
        }

        // Validate email
        if (email === "" || !emailPattern.test(email)) {
            document.getElementById("email-error").innerText = "Please enter a valid email address.";
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
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        // document.getElementById("msg_name").innerText = "";
        // document.getElementById("email-error").innerText = "";
    }


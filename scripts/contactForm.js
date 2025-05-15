function toggleContactModal() {
    const element = document.getElementById("contact-modal");
    element.classList.toggle("show");
}

async function submitForm(event) {
    event.preventDefault();

    const form = event.target;
    let isValid = true;

    const requiredFields = form.querySelectorAll("[required]");
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.border = "2px solid red";
            isValid = false;
        } else {
            field.style.border = "";
        }
    });

    if (!isValid) {
        toggleCustomAlert("error", "Please fill out all required fields.");
        return;
    }

    const formData = Object.fromEntries(new FormData(event.target).entries());

    try {
        const response = await fetch("https://www.form-to-email.com/api/s/Od0_hkTc3tVP", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        

    
        if (response.ok) {
            toggleCustomAlert("success", 
                "Your message has been sent. <br>Can't wait to chat!",
                event);
            console.log("Form submitted successfully.");
        } else {
            toggleCustomAlert("error", "Failed to submit form.");
            console.log("Error submitting form:", response.status)
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        toggleCustomAlert("error", "An error occurred while sending your message. Please try again later.");
    }
}

function toggleCustomAlert(type, message, event = null) {
    const customAlert = document.getElementById("custom-alert-modal");
    const customAlertIcon = document.getElementById("custom-alert-icon");
    const customAlertStatus = document.getElementById("custom-alert-status");
    const customAlertMessage = document.getElementById("custom-alert-message");
    const customAlertCloseButton = document.getElementById("custom-alert-close-button");

    customAlertMessage.textContent = message;
    customAlertIcon.classList.remove("success", "error");
    customAlertIcon.classList.add(type);

    // Clear any previous click handlers
    customAlertCloseButton.onclick = null;

    if (type === "success") {
        customAlertIcon.src = "assets/icons/success_black.svg";
        customAlertIcon.alt = "Success";
        customAlertStatus.innerHTML = "Success";
        customAlertMessage.innerHTML = message;
        customAlertCloseButton.onclick = () => {
            customAlert.classList.remove("show");
            toggleContactModal(); 
            if (event) {
                event.target.reset();
            }
        };
    } else {
        customAlertIcon.src = "assets/icons/error_black.svg";
        customAlertIcon.alt = "Error";
        customAlertStatus.innerHTML = "Error"
        customAlertMessage.innerHTML = message;
        customAlertCloseButton.onclick = () => {
            customAlert.classList.remove("show"); 
        };
    }

    customAlert.classList.add("show");
}
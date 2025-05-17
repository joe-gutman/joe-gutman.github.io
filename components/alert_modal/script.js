async function showAlertModal(statusText, messageText) {
    try {
        const response = await fetch('./components/alert_modal/modal.html');
        const modalHTML = await response.text();

        // Append modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    } catch (error) {
        console.error("Failed to load alert modal:", error);
        return;
    }

    // Get modal elements
    const alertModal = document.getElementById('alert-modal');
    const alertStatus = document.getElementById('alert-status');
    const alertMessage = document.getElementById('alert-message');
    const alertClose = document.getElementById('alert-close');

    // Set content
    alertStatus.innerHTML = statusText;
    alertMessage.innerHTML = messageText;

    fitty('.fit', {
        minSize: 40,
        multiLine: true
    });

    // Handle close
    alertClose.onclick = () => {
        alertModal.remove();
    };
}

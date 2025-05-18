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
    
    // Handle close
    alertClose.onclick = () => {
        // Remove the 'show' class to start fade-out
        alertModal.classList.remove('show');

        // Wait for the transition to complete before removing
        alertModal.addEventListener('transitionend', () => {
            alertModal.remove();
        }, { once: true });
    };

    requestAnimationFrame(() => {
        setTimeout(() => {
            alertModal.classList.add('show');
            fitty('.fitty-title').forEach(instance => instance.fit());
            console.log("fitty");
        }, 100);
    }, 50);
}

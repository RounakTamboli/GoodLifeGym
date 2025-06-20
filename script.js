document.querySelectorAll('.signup-btn').forEach(button => {
    button.addEventListener('click', () => {
        const plan = button.getAttribute('data-plan');
        alert(You selected the ${plan.replace('-', ' ')} plan! Redirecting to payment...);
        // Redirect to payment page later
    });
});
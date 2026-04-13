// Set max date to today
document.getElementById('dob').max = new Date().toISOString().split('T')[0];

function calculateAge() {
    const name = document.getElementById('name').value.trim();
    const dob = document.getElementById('dob').value;
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    // Hide previous results/errors
    resultDiv.classList.remove('show');
    errorDiv.classList.remove('show');

    // Validation
    if (!name) {
        showError('Please enter your name!');
        return;
    }

    if (!dob) {
        showError('Please select your date of birth!');
        return;
    }

    const birthDate = new Date(dob);
    const today = new Date();

    // Check if birth date is in the future
    if (birthDate > today) {
        showError('Date of birth cannot be in the future!');
        return;
    }

    // Calculate age
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
        ageYears--;
        ageMonths += 12;
        if (ageDays < 0) {
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            ageDays = lastMonth.getDate() + ageDays;
        }
    }

    // Display result
    const resultHTML = `
        <div class="age-display">Hi ${name}!</div>
        <div class="age-details">
            You are <strong>${ageYears}</strong> years,
            <strong>${ageMonths}</strong> months, and
            <strong>${ageDays}</strong> days old! 🎉
        </div>
    `;
    
    resultDiv.innerHTML = resultHTML;
    resultDiv.classList.add('show');
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
}

// Calculate age on Enter key press
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateAge();
    }
});

// Auto-focus name input on page load
window.onload = function() {
    document.getElementById('name').focus();
};

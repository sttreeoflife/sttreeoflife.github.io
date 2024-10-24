// passing parameter
var submitStatus, submitPhone;

// get DOM element
var inputField, statusField;
var loginButton, logoutButton;

window.onload = function() {

    inputField = document.getElementById('inputField');
    statusField = document.getElementById('status');
    loginButton = document.getElementById('loginButton');
    logoutButton = document.getElementById('logoutButton');


    // Store the original placeholder text
    const originalPlaceholder = inputField.placeholder;

    // Remove placeholder on focus
    inputField.addEventListener('focus', () => {
        inputField.placeholder = '';
    });

    // Restore placeholder on blur
    inputField.addEventListener('blur', () => {
        inputField.placeholder = originalPlaceholder;
    });

    inputField.addEventListener('input',  () => checkDigit());

};

function addInput(value) {
    inputField.value += value;
    checkDigit();
}

function clearInput() {
    inputField.value = '';
    disableButtons(true);
}

function checkDigit() {
    
        // Check if the value is exactly 8 digits long
        if (/^\d{8}$/.test(inputField.value)) {
            disableButtons(false); // Enable the submit button
            return true;
        } else {
            disableButtons(true); // Disable the submit button
            return false;
        }
}

function disableButtons(boolean) {
    loginButton.disabled = boolean;
    logoutButton.disabled = boolean;
}

function submitForm(status) {
    const myForm = document.getElementById('myForm');
    statusField.value = status;

    submitStatus = status;
    submitPhone = inputField.value;

    myForm.submit();

}

function showConfirmPage() {
    if(submitStatus != null && submitPhone != null) {
        window.location.href = `submission.html?status=${submitStatus}&phone=${submitPhone}`;
    }
}


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }

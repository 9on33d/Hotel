const wrapper = document.querySelector('.wrapper');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');

registerLink.onclick = () => {
    wrapper.classList.add('active');
}

loginLink.onclick = () => {
    wrapper.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function() {
    // Your existing code here
    function togglePasswordVisibility(inputId, iconId) {
        var passwordInput = document.getElementById(inputId);
        var passwordIcon = document.getElementById(iconId);
    
        // Toggle the type attribute of the password input
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    
        // Toggle the classes on the password icon
        passwordIcon.classList.toggle('bx', true);
        passwordIcon.classList.toggle('bxs-lock-open', passwordInput.type === 'text');
        passwordIcon.classList.toggle('bxs-lock-alt', passwordInput.type === 'password');
    }

// Attach the toggle function to the "show password" icons
document.getElementById('showPasswordLogin').addEventListener('click', function () {
    togglePasswordVisibility('loginPassword', 'showPasswordLogin');
});

document.getElementById('showPasswordRegister').addEventListener('click', function () {
    togglePasswordVisibility('registerPassword', 'showPasswordRegister');
});

});
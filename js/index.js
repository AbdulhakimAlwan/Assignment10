document.addEventListener('DOMContentLoaded', function() {
  let registeredEmails = JSON.parse(localStorage.getItem('registeredEmails')) || [];

  document.getElementById('signinLink').addEventListener('click', function(event) {
    event.preventDefault();
    clearErrors();
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
  });

  document.getElementById('signupLink').addEventListener('click', function(event) {
    event.preventDefault();
    clearErrors();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
  });

  function clearErrors() {
    document.getElementById('allInputsError').textContent = '';
    document.getElementById('allInputsError').style.display = 'none';
    document.getElementById('loginError').textContent = '';
    document.getElementById('loginError').style.display = 'none';
  }

  document.getElementById('signupButton').addEventListener('click', function(event) {
    event.preventDefault();

    let signName = document.getElementById('signname').value;
    let signEmail = document.getElementById('signEmail').value.toLowerCase();
    let signPassword = document.getElementById('signPassword').value;
    let allInputsError = document.getElementById('allInputsError');
    let signupSuccessMessage = document.getElementById('signupSuccessMessage');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!signName.trim() || !signEmail.trim() || !signPassword.trim()) {
      allInputsError.textContent = 'All inputs are required.';
      allInputsError.style.display = 'block';
    } else if (registeredEmails.includes(signEmail)) {
      allInputsError.textContent = 'Email is already in use.';
      allInputsError.style.display = 'block';
    } else {
      allInputsError.textContent = '';
      allInputsError.style.display = 'none';
      registeredEmails.push(signEmail);

      localStorage.setItem(signEmail, JSON.stringify({ name: signName, email: signEmail }));

      localStorage.setItem('registeredEmails', JSON.stringify(registeredEmails));

      document.getElementById('signupForm').style.display = 'none';
      document.getElementById('loginForm').style.display = 'block';
      signupSuccessMessage.style.display = 'block';
    }
  });

  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let loginEmail = document.getElementById('logEmail').value.toLowerCase();
    let loginPassword = document.getElementById('logPassword').value;
    let loginError = document.getElementById('loginError');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      loginError.textContent = 'Incorrect email or password.';
      loginError.style.display = 'block';
    } else {
      if (localStorage.getItem(loginEmail)) {
        let userData = JSON.parse(localStorage.getItem(loginEmail));
        let userName = userData.name;
        sessionStorage.setItem('userName', userName);
        window.location.href = 'welcome.html';
      } else {
        loginError.textContent = 'Incorrect email or password.';
        loginError.style.display = 'block';
      }
    }
  });
});

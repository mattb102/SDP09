import Cookies from "js-cookie";

function handleRegister(event, email, password, confirmPassword, setRegisterSuccess) {
  event.preventDefault();
  const csrfToken = Cookies.get('csrftoken');
  const testEmail = 'test@test.com';

  if (password !== confirmPassword) {
    console.error("Passwords don't match");
    return;
  }

  const headers = {
    'Content-Type': 'application/json',
    'X-CSRFToken': csrfToken,
  };

  fetch('api/users/', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ email, testEmail, password }),
  })
  .then(response => {
    if (response.ok) {
      // Successful sign up, redirect or perform any other action
      setRegisterSuccess(true);
    } else {
      // Handle error responses from backend
      return response.json().then(data => {
        console.error(data.message);
      });
    }
  })
  .catch(error => {
    console.error('An error occurred. Please try again.');
  });
}

export default handleRegister;
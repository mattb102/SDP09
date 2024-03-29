import Cookies from "js-cookie";

function handleRegister(event, email, password, confirmPassword, setRegisterSuccess) {
  event.preventDefault();
  const csrfToken = Cookies.get('csrftoken');

  const username = email; // temporary until get rid of usernames
  const testEmail = 'test@test.com'; // use test email for each account (placeholder)

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
    body: JSON.stringify({ username, testEmail, password }), // change username to email when they are removed
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
function handleRegister(event) {
  event.preventDefault();
  const csrfToken = Cookies.get('csrftoken');

  if (password !== confirmPassword) {
    setError("Passwords don't match");
    return;
  }

  const headers = {
    'Content-Type': 'application/json',
    'X-CSRFToken': csrfToken,
  };

  fetch('api/users/', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ username, email, password }),
  })
  .then(response => {
    if (response.ok) {
      // Successful sign up, redirect or perform any other action
    } else {
      // Handle error responses from backend
      return response.json().then(data => {
        setError(data.message);
      });
    }
  })
  .catch(error => {
    setError('An error occurred. Please try again.');
  });
}

export default handleRegister;
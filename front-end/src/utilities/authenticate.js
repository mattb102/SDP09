async function handleSubmit(event) {
  event.preventDefault();
  const csrfToken = Cookies.get('csrftoken');

  try {
    const response = await fetch('api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      Cookies.set('token', token, { path: '/', sameSite: 'strict', secure: true });
      dispatch(login())
      navigate('/dashboard');
    } else {
      setFailedLogin(true);
    }
  } catch (error) {
    console.error('Login error:', error);
    setFailedLogin(true);
  }
}

export default handleSubmit;
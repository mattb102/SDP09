import Cookies from 'js-cookie';

async function handleAuthenticate(event, email, password, setAuthorized) {
  event.preventDefault();
  const csrfToken = Cookies.get('csrftoken');

  try {
    const response = await fetch('api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      Cookies.set('token', token, { path: '/', sameSite: 'strict', secure: true });
      setAuthorized(true);
    } else {
      // TODO: Couldn't reach API or bad credentials

    }
  } catch (error) {
    // TODO: Some other error occurred
    console.error('Login error:', error);
  }
}

export default handleAuthenticate;
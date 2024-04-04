import Cookies from 'js-cookie';

async function handleAuthenticate(event, email, password, setIsLoggedIn) {
  event.preventDefault();
  const csrfToken = Cookies.get('csrftoken');

  const username = email; // temp until backend remove usernames

  try {
    const response = await fetch('api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({ username, password }), // change username to email when backend removes usernames
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      Cookies.set('token', token, { path: '/', sameSite: 'strict', secure: true });
      setIsLoggedIn(true);
    } else {
      // TODO: Couldn't reach API or bad credentials

    }
  } catch (error) {
    // TODO: Some other error occurred
    console.error('Login error:', error);
  }
}

export default handleAuthenticate;
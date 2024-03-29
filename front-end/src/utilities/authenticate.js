import Cookies from 'js-cookie';

async function handleAuthenticate(email, password, setAuthorized) {
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
      // TODO: Response proccessed but login failed, handle this
      console.log('test')
    }
  } catch (error) {
    // TODO: Error occurred with api request
    setAuthorized(true);
    console.error('Login error:', error);
  }
}

export default handleAuthenticate;
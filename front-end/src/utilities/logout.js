import Cookies from 'js-cookie';

function logout(setIsLoggedIn) {
  setIsLoggedIn(false);
  Cookies.remove('token');
}

export default logout;
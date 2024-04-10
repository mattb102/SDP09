import Cookies from 'js-cookie';

function logout(setIsLoggedIn) {
  setIsLoggedIn(false);
  sessionStorage.setItem('isLoggedIn', 'false')
  Cookies.remove('token');
}

export default logout;
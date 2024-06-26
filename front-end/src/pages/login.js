import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Flex, Hide } from '@chakra-ui/react';

import LandingBanner from '../components/landing-banner';
import LoginForm from '../components/login-form';
import RegisterForm from '../components/register-form';

const LoginPage = () => {
  const [signup, setSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useOutletContext();

  return(
    <Flex
    direction="row"
    align="center"
    justify="center"
    height="100vh"
    >
      <Hide breakpoint='(max-width: 800px)'>
        <LandingBanner display={{ base: 'none', md: 'block' }}/>
      </Hide>
      {signup ? <RegisterForm setSignup={setSignup}/> : <LoginForm setSignup={setSignup} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}
    </Flex>
  );
};

export default LoginPage;
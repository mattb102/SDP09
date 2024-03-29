import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';

import LandingBanner from '../components/landing-banner';
import LoginForm from '../components/login-form';
import RegisterForm from '../components/register-form';

const LoginPage = () => {
  const [signup, setSignup] = useState(false);

  return(
    <Flex
    direction="row"
    align="center"
    justify="center"
    height="100vh"
    >
      <LandingBanner/>
      {signup ? <RegisterForm setSignup={setSignup}/> : <LoginForm setSignup={setSignup}/>}
    </Flex>
  );
};

export default LoginPage;

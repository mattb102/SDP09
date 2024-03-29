import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';

import LandingBanner from '../components/landing-banner';
import LoginForm from '../components/login-form';
import RegisterForm from '../components/register-form';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, setSignup] = useState(false);

  const componentProps = {email, setEmail, password, setPassword, setSignup}

  return(
    <Flex
    direction="row"
    align="center"
    justify="center"
    height="100vh"
    >
      <LandingBanner/>
      {signup ? <RegisterForm {...componentProps}/> : <LoginForm {...componentProps}/>}
    </Flex>
  );
};

export default LoginPage;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, FormControl, FormLabel, Input, Heading, VStack, Box } from "@chakra-ui/react";

import handleAuthenticate from "../utilities/authenticate"; 

const LoginForm = ({setSignup, setIsLoggedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authorized === true) {
      setIsLoggedIn(true);
      navigate("/dashboard");
    }
  }, [authorized, navigate]);

  return (
    <Box
      p={8}
      m={8}
      w='350px'
      borderWidth={1}
      borderRadius={0}
      boxShadow="lg"
      bg="white"
    >
      <Heading mb={4}>Login</Heading>
      <form onSubmit={(e) => handleAuthenticate(e, email, password, setAuthorized)}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outline"
              focusBorderColor="gray.600"
              borderRadius={0}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outline"
              focusBorderColor="gray.600"
              borderRadius={0}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="gray"
            width="100%"
            borderRadius={0}
            _hover={{ bg: 'gray', color: 'white' }}
          >
            Login
          </Button>
          <Link href="#" color="gray.600">
            Forgot password?
          </Link>
        </VStack>
      </form>
      <Box textAlign="center" mt={4}>
        Don't have an account?{' '}
        <Link to="/" onClick={() => setSignup(true)} color="gray.600">
          Sign up
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
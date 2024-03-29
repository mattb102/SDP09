import React, { useState, useNavigate, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, FormControl, FormLabel, Input, Heading, VStack, Box } from "@chakra-ui/react";

import handleRegister from "../utilities/register";

function RegisterForm({setSignup}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (registerSuccess === true) {
      navigate("/dashboard");
    }
  }, [registerSuccess, navigate]);

  return (
    <Box
      p={8}
      m={8}
      w='350px'
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
      bg="white"
    >
      <Heading mb={4}>Sign up</Heading>
      <form onSubmit={(e) => handleRegister(e, email, password, confirmPassword, setRegisterSuccess)}>
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
          <FormControl id="password" isRequired>
            <FormLabel>Re-enter password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            _hover={{ bg: 'gray.700' }}
          >
            Sign up
          </Button>
        </VStack>
      </form>
      <Box textAlign="center" mt={4}>
        Already have an account?{' '}
        <Link to ="/" onClick={() => setSignup(false)} color="gray.600">
          Log in
        </Link>
      </Box>
    </Box>
  );
}

export default RegisterForm;
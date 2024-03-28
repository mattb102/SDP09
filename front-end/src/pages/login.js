import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Link,
} from '@chakra-ui/react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your login logic here
    console.log('Login clicked!');
  };

  return (
    <Box
      p={8}
      maxWidth="md"
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
      margin="auto"
      mt={8}
    >
      <Heading mb={4}>Login</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="100%">
            Login
          </Button>
          <Link href="#" color="blue.400">
            Forgot password?
          </Link>
        </VStack>
      </form>
      <Box textAlign="center" mt={4}>
        Don't have an account?{' '}
        <Link href="#" color="blue.400">
          Sign up
        </Link>
      </Box>
    </Box>
  );
};

export default LoginPage;

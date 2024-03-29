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
  Flex,
  Image,
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
    <Flex
      direction="row"
      align="center"
      justify="center"
      height="100vh"
    >
      {/* Logo on the left */}
      <Box m={8}>
        <Image src="logo.jpg" alt="Logo" h='85%' w='85%'/>
      </Box>

      {/* Form on the right */}
      <Box
        p={8}
        m={8}
        w='350px'
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="white"
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
              _hover={{ bg: 'gray.700' }}
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
          <Link href="#" color="gray.600">
            Sign up
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginPage;

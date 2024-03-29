import React from "react";
import { Link } from "react-router-dom";
import { Button, FormControl, FormLabel, Input, Heading, VStack, Box } from "@chakra-ui/react";

const LoginForm = ({email, setEmail, password, setPassword, setSignup, handleLogin}) => {
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
      <Heading mb={4}>Login</Heading>
      <form onSubmit={handleLogin}>
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
        <Link onClick={() => setSignup(true)} color="gray.600">
          Sign up
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
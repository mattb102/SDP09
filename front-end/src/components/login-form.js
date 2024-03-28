import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, FormControl, FormLabel, Input, Heading, VStack } from "@chakra-ui/react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your login logic here
    console.log("Login clicked!");
  };

  return (
    <VStack p={8} maxWidth="md" borderWidth={1} borderRadius={8} boxShadow="lg" flex='1' justify='center' align='center'>
      <Heading mb={4}>Login</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Link to='/dashboard'><Button type="submit" colorScheme="blue">Login</Button></Link>
        </VStack>
      </form>
    </VStack>
  );
};

export default LoginForm;
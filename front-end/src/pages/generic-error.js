import React from 'react';
import { Flex, Heading, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const GenericErrorPage = () => {
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Heading as="h1" size="2xl" mb="4">
        Sorry, an error occured
      </Heading>
      <Text fontSize="xl" mb="4">
        Please try refreshing the page or try again later.
      </Text>
      <Button
        as={RouterLink}
        to="/dashboard"
        colorScheme="blackAlpha"
        bg="gray"
        borderRadius={0}
        size="lg"
      >
        Go to Dashboard
      </Button>
    </Flex>
  );
};

export default GenericErrorPage;
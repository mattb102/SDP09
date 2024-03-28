import React from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";

function LandingBanner() {
  return(
    <Flex justify='center' align='center' bgImage='pexels-photo-7078661.jpeg' flex='2'>
      <Box m='auto' bg='rgba(0, 0, 0, 0.8)' color='white' borderRadius='sm' p='4'>
        <Heading fontSize='8xl'>Outreach</Heading>
        <Text>REALTY SERVICING</Text>
      </Box>
    </Flex>
  );
}

export default LandingBanner;
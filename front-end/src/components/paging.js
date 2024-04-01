import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

function Paging() {
  return (
    <Flex mt="4" justify="center" width="100%">
      <Button colorScheme="blue" mr="2"><ChevronLeftIcon /></Button>
      <Button colorScheme="blue"><ChevronRightIcon /></Button>
    </Flex>
  );
}

export default Paging;

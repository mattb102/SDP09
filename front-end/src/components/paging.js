import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

function Paging() {
  return (
    <Flex mt="4" justify="center" width="100%">
      <Button colorScheme="blackAlpha" mr="2" bg="gray" borderRadius={0}>
        <ChevronLeftIcon />
      </Button>
      <Button colorScheme="blackAlpha" bg="gray" borderRadius={0}>
        <ChevronRightIcon />
      </Button>
    </Flex>
  );
}

export default Paging;
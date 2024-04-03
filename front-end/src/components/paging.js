import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import { handleBackPage, handleNextPage } from "../utilities/paging";

function Paging({setCurrentPage, totalPages}) {
  return (
    <Flex mt="4" justify="center" width="100%">
      <Button colorScheme="blackAlpha" m="2" bg="gray" borderRadius={0} onClick={() => handleBackPage(setCurrentPage)}>
        <ChevronLeftIcon />
      </Button>
      <Button colorScheme="blackAlpha" m="2" bg="gray" borderRadius={0} onClick={() => handleNextPage(setCurrentPage, totalPages)}>
        <ChevronRightIcon />
      </Button>
    </Flex>
  );
}

export default Paging;
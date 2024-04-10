import React from "react";
import { Flex, Button, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import { handleBackPage, handleNextPage } from "../utilities/paging";

function Paging({currentPage, setCurrentPage, totalPages}) {
  return (
    <Flex justify="center" width="100%">
      {
      currentPage > 1 &&
      <Button colorScheme="blackAlpha" m="2" bg="gray" borderRadius={0} onClick={() => handleBackPage(setCurrentPage)}>
        <ChevronLeftIcon />
      </Button>
      }
      <Text pt={3} pb={3}>Page {currentPage} of {totalPages}</Text>
      {
      currentPage < totalPages &&
      <Button colorScheme="blackAlpha" m="2" bg="gray" borderRadius={0} onClick={() => handleNextPage(setCurrentPage, totalPages)}>
        <ChevronRightIcon />
      </Button>
      }
    </Flex>
  );
}

export default Paging;
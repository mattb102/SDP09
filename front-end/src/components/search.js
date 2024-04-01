import React from 'react';
import { Box, Flex, Input, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons'; // Import the ChevronDownIcon

function SearchBar() {
  return (
    <Box p={4}>
      <Flex alignItems="center">
        <Input placeholder="Search..."/>
        <Button colorScheme='blackAlpha' bg="gray" borderRadius={1}>Search</Button>
        <Menu>
          <MenuButton as={Button} ml={4} colorScheme="blackAlpha" borderRadius={1} rightIcon={<ChevronDownIcon />}>
            Filters
          </MenuButton>
          <MenuList>
            <MenuItem>Filter 1</MenuItem>
            <MenuItem>Filter 2</MenuItem>
            {/* Add more MenuItem components as needed */}
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default SearchBar;

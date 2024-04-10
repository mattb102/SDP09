import React from 'react';
import { Box, Flex, Input, Button, Menu, MenuButton, MenuList, Text, Select } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

import handleFilter from '../utilities/filter';

function SearchBar({setQueryParams, setCurrentPage}) {
  return (
    <Box p={4}>
      <Flex alignItems="center">
        <Input borderRadius={0} placeholder="Search..." />
        <Button colorScheme='blackAlpha' bg="gray" borderRadius={0}>Search</Button>
        <Menu>
          <MenuButton as={Button} ml={4} colorScheme="blackAlpha" bg="gray" borderRadius={0} rightIcon={<ChevronDownIcon />}>
            Filters
          </MenuButton>
          <MenuList borderRadius={0} p={2}>
            <Text>Price Range:</Text>
            <Flex>
              <Input name="min_price" type="number" placeholder="Min" onChange={(e) => handleFilter(e, setQueryParams, setCurrentPage)}/>
              <Input name="max_price" type="number" placeholder="Max" onChange={(e) => handleFilter(e, setQueryParams, setCurrentPage)}/>
            </Flex>
            <Text>Number of Bedrooms:</Text>
            <Input name="beds_total" type="number" min="0" onChange={(e) => handleFilter(e, setQueryParams, setCurrentPage)}/>
            <Text>Number of Bathrooms:</Text>
            <Input name="baths_total" type="number" min="0" onChange={(e) => handleFilter(e, setQueryParams, setCurrentPage)}/>
            <Text>Property Type:</Text>
            <Select>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="CO">Condo</option>
            </Select>
            <Text>Location:</Text>
            <Input type="text" placeholder="Location" onChange={(e) => handleFilter(e, setQueryParams, setCurrentPage)}/>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default SearchBar;
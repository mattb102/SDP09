import React from 'react';
import { Box, Flex, Input, Button, Menu, MenuButton, MenuList, Text, Select, Stack } from '@chakra-ui/react';
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
            <Stack spacing={2}>
              <Text>Price Range:</Text>
              <Flex spacing={1}>
                <Input name="min_price" type="number" placeholder="Minimum" onChange={(e) => handleFilter(e, setQueryParams, setCurrentPage)}/>
                <Input name="max_price" type="number" placeholder="Maximum" onChange={(e) => handleFilter(e, setQueryParams, setCurrentPage)}/>
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
              <Text>Square Footage:</Text>
              <Input name="sq_ft_total" type="number" min="0" onChange={(e) => handleFilter(e, setQueryParams, setCurrentPage)}/>
            </Stack>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default SearchBar;
import React from 'react';
import { Box, Flex, Input, Button, Menu, MenuButton, MenuList, Text, Select } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

function SearchBar({setQueryParams}) {
  const handleFilter = (e) => {
    const { name, value } = e.target;
    if (value === '') {
      setQueryParams(prevParams => {
        delete prevParams[name];
        return { ...prevParams };
      });
    } else {
      setQueryParams(prevParams => ({
        ...prevParams,
        [name]: value
      }));
    }
  };  

  return (
    <Box p={4}>
      <Flex alignItems="center">
        <Input borderRadius={0} placeholder="Search..." />
        <Button colorScheme='blackAlpha' bg="gray" borderRadius={0}>Search</Button>
        <Menu>
          <MenuButton as={Button} ml={4} colorScheme="blackAlpha" bg="gray" borderRadius={0} rightIcon={<ChevronDownIcon />}>
            Filters
          </MenuButton>
          <MenuList borderRadius={0}>
            <Text>Price Range:</Text>
            <Flex>
              <Input name="min_price" type="text" placeholder="Min" ml={2} onChange={handleFilter}/>
              <Input name="max_price" type="text" placeholder="Max" ml={2} onChange={handleFilter}/>
            </Flex>
            <Text>Number of Bedrooms:</Text>
            <Input name="beds_total" type="number" min="0" ml={2} onChange={handleFilter}/>
            <Text>Number of Bathrooms:</Text>
            <Input name="baths_total" min="0" ml={2} onChange={handleFilter}/>
            <Text>Property Type:</Text>
            <Select ml={2} >
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
            </Select>
            <Text>Location:</Text>
            <Input type="text" placeholder="Location" ml={2} />
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default SearchBar;
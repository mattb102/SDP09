import React, { useState } from 'react';
import { Box, Flex, Input, Button, Menu, MenuButton, MenuList, Text, Select, Stack, HStack } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

import handleFilter from '../utilities/filter';
import clearFilter from '../utilities/clear-filter';

function SearchBar({setQueryParams, setCurrentPage}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box p={4}>
      <Flex alignItems="center">
        <Input borderRadius={0} placeholder="Search..." />
        <Button colorScheme='blackAlpha' bg="gray" borderRadius={0}>Search</Button>
        <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
          <MenuButton as={Button} ml={4} colorScheme="blackAlpha" bg="gray" borderRadius={0} rightIcon={<ChevronDownIcon />} onClick={() => setMenuOpen(!menuOpen)}>
            Filters
          </MenuButton>
          <MenuList borderRadius={0} p={2}>
            <form onSubmit={(e) => handleFilter(e, setQueryParams, setCurrentPage, setMenuOpen)}>
              <Stack spacing={2}>
                <Text>Price Range:</Text>
                <Flex spacing={1}>
                  <Input name="min_price" type="number" placeholder="Minimum" borderRadius={0}/>
                  <Input name="max_price" type="number" placeholder="Maximum" borderRadius={0}/>
                </Flex>
                <Text>Number of Bedrooms:</Text>
                <Input name="beds_total" type="number" min="0" borderRadius={0}/>
                <Text>Number of Bathrooms:</Text>
                <Input name="baths_total" type="text" min="0" placeholder="Full/Half" borderRadius={0}/>
                <Text>Property Type:</Text>
                <Select borderRadius={0}>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="CO">Condo</option>
                </Select>
                <Text>Square Footage:</Text>
                <Input name="sq_ft_total" type="number" placeholder="Minimum" min="0" borderRadius={0}/>
                <HStack>
                  <Button
                    type="submit"
                    colorScheme="gray"
                    width="100%"
                    borderRadius={0}
                    _hover={{ bg: 'gray', color: 'white' }}
                  >
                    Filter
                  </Button>
                  <Button
                    colorScheme="gray"
                    width="100%"
                    borderRadius={0}
                    _hover={{ bg: 'gray', color: 'white' }}
                    onClick={(e) => clearFilter(e, setQueryParams, setCurrentPage, setMenuOpen)}
                  >
                    Clear
                  </Button>
                </HStack>
              </Stack>
            </form>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default SearchBar;
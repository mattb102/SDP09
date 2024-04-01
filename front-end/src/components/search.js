import React from 'react';
import { Box, Flex, Input, Button, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons'; // Import the ChevronDownIcon

function SearchBar() {
  const stopPropagation = (e) => {
    e.stopPropagation();
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
            <Text>
              <label>
                Price Range:
                <input type="text" placeholder="Min" style={{ marginLeft: '10px' }}/>
                <input type="text" placeholder="Max" style={{ marginLeft: '10px' }}/>
              </label>
            </Text>
            <MenuItem>
              <label>
                Number of Bedrooms:
                <input type="number" min="0" style={{ marginLeft: '10px' }} onClick={stopPropagation} />
              </label>
            </MenuItem>
            <MenuItem>
              <label>
                Number of Bathrooms:
                <input type="number" min="0" style={{ marginLeft: '10px' }} onClick={stopPropagation} />
              </label>
            </MenuItem>
            <MenuItem>
              <label>
                Property Type:
                <select style={{ marginLeft: '10px' }} onClick={stopPropagation}>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                </select>
              </label>
            </MenuItem>
            <MenuItem>
              <label>
                Location:
                <input type="text" placeholder="Location" style={{ marginLeft: '10px' }} onClick={stopPropagation} />
              </label>
            </MenuItem>
            {/* Add more MenuItem components as needed */}
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default SearchBar;
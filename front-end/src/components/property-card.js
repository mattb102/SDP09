import React from "react";
import { Card, CardBody, Image, Stack, Heading, Text} from "@chakra-ui/react";

function PropertyCard() {
  return(
    <Card maxW='sm'>
      <CardBody>
        <Image
          src='https://photos.zillowstatic.com/fp/11bfacdab1f7910be8e606a470d9b4b8-cc_ft_1536.webp'
          borderRadius='sm'
        />
        <Stack mt='6' spacing='3' textAlign='left'>
          <Heading size='md'>1 Minnesota Rd, # 1, Storrs Mansfield, CT 06268</Heading>
          <Text>Bedrooms: 2</Text>
          <Text>Bathrooms: 1.5</Text>
          <Text>Size: 1,130 sqft</Text>
          <Text></Text>
          <Text color='blue.600' fontSize='2xl'>
            $400,000
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default PropertyCard;
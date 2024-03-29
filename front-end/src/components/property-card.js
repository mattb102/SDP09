import React from "react";
import { Card, CardBody, Image, Stack, Heading, Text} from "@chakra-ui/react";

function PropertyCard({property, setCurrentProperty}) {
  return(
    <Card maxW='md'>
      <CardBody>
        <Image
          src={property.image_url}
          borderRadius='sm'
        />
        <Stack mt='6' spacing='3' textAlign='left'>
          <Heading size='md'>{`${property.address}, ${property.town}, CT`}</Heading>
          <Text>Bedrooms: {property.beds_total}</Text>
          <Text>Bathrooms: {property.baths_total}</Text>
          <Text>Size: {property.sq_ft_total.toLocaleString()} sqft</Text>
          <Text></Text>
          <Text color='blue.600' fontSize='2xl'>{`$${property.price.toLocaleString()}`}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default PropertyCard;
import React, { useState } from "react";
import { Card, CardBody, Image, Stack, Heading, Text} from "@chakra-ui/react";

import PropertyModal from "./property-modal";

function PropertyCard({property}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return(
    <>
      <Card maxW="md" mb={4} onClick={openModal} cursor="pointer" borderRadius={0}>
        <CardBody>
          <Image
            src={property.image_url}
            borderRadius={1}
            w='408px'
            h='278px'
          />
          <Stack mt='6' spacing='3' textAlign='left'>
            <Heading size='md'>{`${property.address}, ${property.town}, CT`}</Heading>
            <Text>Bedrooms: {property.beds_total}</Text>
            <Text>Bathrooms: {property.baths_total}</Text>
            <Text>Size: {property.sq_ft_total.toLocaleString()} sqft</Text>
            <Text></Text>
            <Text color='blue.600' fontSize='2xl'>{`$${property.price.toLocaleString()}`}</Text>
            <Text color='red.600' fontSize='2xl'>{`Projected 5-yr: `}</Text>
          </Stack>
        </CardBody>
      </Card>
      <PropertyModal isOpen={isModalOpen} onClose={closeModal} property={property} />
    </>
  );
}

export default PropertyCard;
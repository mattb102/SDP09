import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, Text } from "@chakra-ui/react";

function PropertyModal({ isOpen, onClose, property }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`${property.address}, ${property.town}, CT`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="3" textAlign="left">
            <Text>Bedrooms: {property.beds_total}</Text>
            <Text>Bathrooms: {property.baths_total}</Text>
            <Text>Size: {property.sq_ft_total.toLocaleString()} sqft</Text>
            <Text>Price: ${property.price.toLocaleString()}</Text>
            {/* Add more property details as needed */}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default PropertyModal;
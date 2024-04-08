import React from "react";
import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  Stack, 
  Text, 
  Image, 
  Heading 
} from "@chakra-ui/react";

function PropertyModal({ isOpen, onClose, property }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`${property.address}, ${property.town}, CT`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}>
          <Stack spacing="3" textAlign="left">
            <Image src={property.image_url} alt="Property Image" />
            <Heading size='lg'>Property Information</Heading>
            {property.mls_number && <Text><b>MLS#:</b> {property.mls_number}</Text>}
            {property.status && <Text><b>Status:</b> {property.status}</Text>}
            {property.last_status_date && <Text><b>Last Status Date:</b> {property.last_status_date}</Text>}
            {property.property_type && <Text><b>Property Type:</b> {property.property_type}</Text>}
            {property.sq_ft_total && <Text><b>Total Square Feet:</b> {property.sq_ft_total.toLocaleString()} sqft</Text>}
            {property.rooms_total && <Text><b>Rooms:</b> {property.rooms_total}</Text>}
            {property.beds_total && <Text><b>Bedrooms:</b> {property.beds_total}</Text>}
            {property.baths_total && <Text><b>Bathrooms:</b> {property.baths_total}</Text>}
            {property.garage_parking_info && <Text><b>Garage/Parking Info:</b> {property.garage_parking_info}</Text>}
            {property.year_built && <Text><b>Year Built:</b> {property.year_built}</Text>}
            {property.assessed_value && <Text><b>Assessed Value:</b> ${property.assessed_value.toLocaleString()}</Text>}
            {property.price && <Text><b>Price:</b> ${property.price.toLocaleString()}</Text>}
            {property.nearby_amenities && <Text><b>Nearby Amenities:</b> {property.nearby_amenities}</Text>}
            {property.hoa_yn !== null && <Text><b>HOA:</b> {property.hoa_yn ? 'Yes' : 'No'}</Text>}
            {property.dom && <Text><b>Days on Market:</b> {property.dom}</Text>}
            {property.association_amenities && <Text><b>Association Amenities:</b> {property.association_amenities}</Text>}
            {property.property_tax && <Text><b>Property Tax:</b> ${parseFloat(property.property_tax).toLocaleString()}</Text>}
            {property.zoning && <Text><b>Zoning:</b> {property.zoning}</Text>}
            {property.handicap_features !== null && <Text><b>Handicap Features:</b> {property.handicap_features ? 'Yes' : 'No'}</Text>}
            {property.energy_features && <Text><b>Energy Features:</b> {property.energy_features}</Text>}
            {property.hoa_fee_amount && <Text><b>HOA Fee Amount:</b> ${parseFloat(property.hoa_fee_amount).toFixed(2)}</Text>}
            {property.hoa_fee_frequency && <Text><b>HOA Fee Frequency:</b> {property.hoa_fee_frequency}</Text>}
            {property.bank_owned_property !== null && <Text><b>Bank Owned Property:</b> {property.bank_owned_property ? 'Yes' : 'No'}</Text>}
            {property.high_school && <Text><b>High School:</b> {property.high_school}</Text>}
            {property.elementary_school && <Text><b>Elementary School:</b> {property.elementary_school}</Text>}
            {property.swimming_pool_yn !== null && <Text><b>Swimming Pool:</b> {property.swimming_pool_yn ? 'Yes' : 'No'}</Text>}
            {property.direct_waterfront_yn !== null && <Text><b>Direct Waterfront:</b> {property.direct_waterfront_yn ? 'Yes' : 'No'}</Text>}
            {property.waterfront_description && <Text><b>Waterfront Description:</b> {property.waterfront_description}</Text>}
            {property.price_change_timestamp && <Text><b>Price Change Timestamp:</b> {property.price_change_timestamp}</Text>}
            {property.cooling_system && <Text><b>Cooling System:</b> {property.cooling_system}</Text>}
            {property.heat_type && <Text><b>Heat Type:</b> {property.heat_type}</Text>}
            {property.heat_fuel && <Text><b>Heat Fuel:</b> {property.heat_fuel}</Text>}
            {property.intermediate_school && <Text><b>Intermediate School:</b> {property.intermediate_school}</Text>}
            {property.exterior_features && <Text><b>Exterior Features:</b> {property.exterior_features}</Text>}
            {property.middle_jr_high_school && <Text><b>Middle Jr High School:</b> {property.middle_jr_high_school}</Text>}
            {property.pool_description && <Text><b>Pool Description:</b> {property.pool_description}</Text>}
            {property.estimated_annual_heat_cost !== null && <Text><b>Estimated Annual Heat Cost:</b> {property.estimated_annual_heat_cost ? `$${parseFloat(property.estimated_annual_heat_cost).toFixed(2)}` : 'N/A'}</Text>}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default PropertyModal;

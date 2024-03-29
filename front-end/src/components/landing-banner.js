import React from "react";
import { Box, Image } from "@chakra-ui/react";

function LandingBanner() {
  return(
    <Box m={8}>
      <Image src="logo.jpg" alt="Logo" h='85%' w='85%'/>
    </Box>
  );
}

export default LandingBanner;
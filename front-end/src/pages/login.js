import React from "react";
import { Flex } from "@chakra-ui/react"

import LandingBanner from "../components/landing_banner";
import LoginForm from "../components/login_form";

function Login() {
  return(
    <Flex h='100vh'>
      <LandingBanner/>
      <LoginForm/>
    </Flex>
  );
}

export default Login;
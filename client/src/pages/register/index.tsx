import React from "react";
import { Flex } from "@welcome-ui/flex";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const Register = () => {
  document.title = "Stwórz konto";

  return (
    <Flex w="100%" minHeight="100vh" bg="very-light-green">
      <LeftSection />
      <RightSection />
    </Flex>
  );
};

export default Register;

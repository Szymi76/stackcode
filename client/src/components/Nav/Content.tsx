import { Flex } from "@welcome-ui/flex";
import React from "react";
import { useAppSelector } from "../../app/hooks";

/*
    Wrapper dla całego nawigatora
*/

export type WrapperProps = { children: React.ReactNode; navToggled: boolean };

export const Wrapper = ({ children, navToggled }: WrapperProps) => {
  return (
    <Flex
      h={{ _: navToggled ? "100vh" : "4rem", md: "4rem" }}
      bg="green"
      justify={{ _: "start", md: "space-between" }}
      align="center"
      px="1rem"
      position="fixed"
      zIndex={40}
      w="100%"
      flexDirection={{ _: "column", md: "row" }}
      transitionDuration={150}>
      {children}
    </Flex>
  );
};

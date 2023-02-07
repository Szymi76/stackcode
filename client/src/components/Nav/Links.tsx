import { Flex } from "@welcome-ui/flex";
import React from "react";
import { Link } from "react-router-dom";

/*
    Wrapper dla listy linków
*/

export type WrapperProps = { children: React.ReactNode };

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <Flex
      align="center"
      justify="start"
      mr={{ _: "0", md: "2rem" }}
      fontSize={{ _: "1.75em", md: "md" }}
      mt={{ _: "3rem", md: "0" }}
      gap="1.25rem"
      flexDirection={{ _: "column", md: "row" }}>
      {children}
    </Flex>
  );
};

/*
    Pojedyńczy link w liście 
*/

export type SingleProps = { to: string; text: string; onClick: () => void };

export const Single = ({ to, text, onClick }: SingleProps) => {
  return <Link to={to} className="nav-link" children={text} onClick={onClick} />;
};

/*
    Wrapper dla dodatkowych linków w wersji responsywnej
*/

export type ResnponsiveWrapperProps = { children: React.ReactNode[]; navToggled: boolean };

export const ResnponsiveWrapper = ({ children, navToggled }: ResnponsiveWrapperProps) => {
  return (
    <Flex direction="column" gap="1.25rem" display={{ _: !navToggled ? "none" : "flex", md: "none" }}>
      {children}
    </Flex>
  );
};

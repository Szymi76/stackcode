import { useEffect, useRef } from "react";
import useIsElementOverflowingParent from "../../hooks/useIsElementOverflowingParent";
import { DropdownMenuStateReturn, DropdownMenu } from "@welcome-ui/dropdown-menu";

// komponenty
import { Flex } from "@welcome-ui/flex";
import { Text } from "@welcome-ui/text";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@welcome-ui/box";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { SingleTab } from "./Content";

/*
  Wrapper dla wszystkich tabów
*/

export type WrapperProps = { children: React.ReactNode };

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <Flex position="relative">
      {children}
      <Box h="2px" w="100%" position="absolute" bottom="-2px" bg="light-gray" />
    </Flex>
  );
};

/*
  Pojedyńczy tab
*/

export type SingleProps = {
  tab: SingleTab;
  active: boolean;
  onOverflowChange: (tab: SingleTab, value: boolean) => void;
  index: number;
};

export const Single = ({ tab, active, onOverflowChange, index }: SingleProps) => {
  const tabRef = useRef<HTMLAnchorElement>(null);
  const isOverflowing = useIsElementOverflowingParent(tabRef, { margin: 50 });

  // aktualizacja listy wszystkich tabów
  useEffect(() => {
    onOverflowChange(tab, isOverflowing);
  }, [isOverflowing]);

  const style: React.CSSProperties = { textDecoration: "none", visibility: isOverflowing ? "hidden" : "visible" };

  return (
    <Link ref={tabRef} key={`tab-link-${index}`} style={style} to={tab.link}>
      <Text
        fontSize="lg"
        whiteSpace="nowrap"
        m="0"
        mb="-2px"
        py=".25rem"
        px="1.25rem"
        fontWeight="600"
        borderBottom="2px solid"
        borderColor={active ? "green" : "transparent"}
        color={active ? "green" : "gray"}
        children={tab.label}
      />
    </Link>
  );
};

/* 
  Menu typu dropdown na nie mieszczące się linki 
*/

export type DropdownProps = { menu: DropdownMenuStateReturn; tabs: SingleTab[] };

export const Dropdown = ({ menu, tabs }: DropdownProps) => {
  const navigate = useNavigate();

  return (
    <>
      {/* trigger */}
      <DropdownMenu.Trigger position="absolute" right="-1.5rem" bottom="-1rem" {...menu} as={Box}>
        <Box h="3rem" w="3rem">
          <EllipsisVerticalIcon className="heroicon" height={30} color="gray" style={{ outline: "none" }} />
        </Box>
      </DropdownMenu.Trigger>

      {/* lista  */}
      <DropdownMenu {...menu} aria-label="Example" mr="1rem">
        {tabs.map((tab, index) => {
          return (
            <DropdownMenu.Item key={"drop" + index} {...menu} onClick={() => navigate(tab.link)}>
              <Text m=".25rem" fontWeight="500" children={tab.label} />
            </DropdownMenu.Item>
          );
        })}
      </DropdownMenu>
    </>
  );
};

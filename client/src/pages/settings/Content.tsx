import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDropdownMenuState } from "@welcome-ui/dropdown-menu";

// komponenty
import { Box } from "@welcome-ui/box";
import { Stack } from "@welcome-ui/stack";
import { Text } from "@welcome-ui/text";
import { Button } from "@welcome-ui/button";
import { Flex } from "@welcome-ui/flex";
import * as Tabs from "./Tabs";

// prefiks dla każdego linku
export const PREFIX = "/ustawienia";

// lista tabów, gdzie każdy zawiera widoczną nazwę oraz link
export const TABS = [
  { label: "Twoja nazwa", link: `${PREFIX}/twoja-nazwa` },
  { label: "Awatar", link: `${PREFIX}/awatar` },
  { label: "Zmień hasło", link: `${PREFIX}/zmien-haslo` },
  { label: "Weryfikacja emailu", link: `${PREFIX}/weryfikacja-emaila` },
  { label: "Usuń konto", link: `${PREFIX}/usun-konto` },
];

// domyślna mapa tabów
export const initialTabs = new Map(TABS.map((tab) => [tab, false]));

export type SingleTab = typeof TABS[0];

/*
  Wrapper dla ustawień
*/

export type WrapperProps = { children: React.ReactNode; title: string };

export const Wrapper = ({ children, title }: WrapperProps) => {
  const navigate = useNavigate();
  const menu = useDropdownMenuState();
  const [tabs, setTabs] = useState(initialTabs);

  // funkcja ustawaia aktualny stan "overflow" pojedyńczego taba
  const handleOverflowChange = (tab: SingleTab, value: boolean) => {
    setTabs((tabs) => {
      const map = new Map([...Array.from(tabs)]);
      map.set(tab, value);
      return map;
    });
  };

  // sprawdza czy jakikolwiek element jest "overflow"
  const isSomeElementOverflowing = Array.from(tabs.values()).some((v) => v == true);

  // tablica tabów które są "overflow"
  const overflowingTabs = Array.from(tabs)
    .filter((tab) => tab[1])
    .map((tab) => tab[0]);

  return (
    <Box overflow="hidden" pt="5rem" minH="100vh" bg="very-light-green">
      <Stack w="95%" maxW="1100px" mx="auto">
        <Text variant="h3" mb=".5rem" children="Ustawienia" />

        {/* lista tabów */}
        <Tabs.Wrapper>
          {TABS.map((tab, index) => {
            return (
              <Tabs.Single
                active={title == tab.label}
                key={index + "tab"}
                index={index}
                tab={tab}
                onOverflowChange={handleOverflowChange}
              />
            );
          })}
          {isSomeElementOverflowing && <Tabs.Dropdown menu={menu} tabs={overflowingTabs} />}
        </Tabs.Wrapper>

        {/* tytuł strony */}
        <Text variant="h4" mb="0" mt="3rem" children={title} />

        {/* biały kontener */}
        <Stack bg="white" border="1px solid" borderColor="light-gray" borderRadius={5} p="1rem">
          {children}
        </Stack>

        <Flex justifyContent="flex-end">
          <Button children="Wróć do profilu" onClick={() => navigate("/twoj-profil")} />
        </Flex>
      </Stack>
    </Box>
  );
};

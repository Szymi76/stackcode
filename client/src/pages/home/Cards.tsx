import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { Text } from "@welcome-ui/text";
import Card from "./Card";

const Cards = () => {
  return (
    <Box mt={{ _: "2rem", lg: "-10rem", xl: "-12rem" }}>
      {/* ostatni skos */}
      <Box>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#3aafa9" fill-opacity="1" d="M0,224L1440,64L1440,320L0,320Z"></path>
        </svg>
      </Box>

      {/* karty */}
      <Flex wrap="wrap" bg="green" mt="-1rem" p="1rem" justify="center" gap="1rem" pb="3rem">
        <Card number={1} text="Zadaj pytanie na naszym forum, śmiało pytaj o co chcesz." />
        <Card number={2} text="Czekaj na odpowiedź, nasza społeczność jest aktywna, nie będziesz czekać długo." />
        <Card number={3} text="Dyskytuj z ludźmi na temat twojego pytania, bądź otwarty i życzliwy." />
        <Card
          number={4}
          text="Ciesz się z odpowiedzi na twoje pytanie i za jakiś czas przyjdź ponownie zadać pytanie."
        />
      </Flex>
    </Box>
  );
};

export default Cards;

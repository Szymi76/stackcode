import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";
import Ilustration from "../../assets/Success2.png";

const NoMoreProblems = () => {
  return (
    <Flex
      h={{ _: "auto", lg: "80vh" }}
      direction={{ _: "column", lg: "row" }}
      mt={{ _: "2rem", lg: "-10rem", xl: "-15rem" }}>
      {/* tekst */}
      <Flex
        w={{ _: "100%", lg: "50%" }}
        textAlign="center"
        direction="column"
        align="center"
        justify="center"
        px=".75rem">
        <Text variant="h1" color="black" children="Koniec z problemami" />
        <Text maxW="25rem" fontSize="1.2em" color="black">
          Nasze forum oferuje rozwiązanie twoich problemów, koniec z przeszukiwaniem 20 stron i traceniem chęci do
          życia. Posiadamy liczną społeczność czekającą na twoje pytania. Dołącz do nas i ciesz się wiedzą i pomocą,
          jaką oferujemy.
        </Text>
      </Flex>

      {/* ilustracja */}
      <Box position="absolute" right="0" zIndex="10" display={{ _: "none", lg: "block" }}>
        <img src={Ilustration} className="home-ilustration" />
      </Box>
    </Flex>
  );
};

export default NoMoreProblems;

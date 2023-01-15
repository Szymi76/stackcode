import { Text } from "@welcome-ui/text";
import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";

import StackcodeLogo from "../../assets/logo3.png";
import Form from "./Form";
import { Link } from "react-router-dom";

const RightSection = () => {
  return (
    <Box w={{ _: "100%", md: "50%" }}>
      <Link to={"/home"}>
        <Box
          h="10%"
          bg="green"
          textAlign="center"
          py=".5rem"
          className="right-side-header"
          display={{ _: "flex", md: "none" }}>
          <img src={StackcodeLogo} height="100%" style={{ margin: "auto" }} />
        </Box>
      </Link>

      {/* kontent */}
      <Box maxWidth={450} mx="auto" mt="10%" p="2rem" h="75%">
        <Text variant="h1">Stwórz konto</Text>

        {/* forumlarz */}
        <Form />
      </Box>
      <Flex
        h="15%"
        bg="dark-green"
        color="white"
        justify="center"
        align="center"
        className="right-side-footer"
        display={{ _: "flex", md: "none" }}>
        <Text px="10%">
          Stworzenie twojego konta STACKCODE umożliwia ci zadawanie pytań, odpowiadanie na nie i co najważniejsze
          zdobywanie wiedzy
        </Text>
      </Flex>
    </Box>
  );
};

export default RightSection;

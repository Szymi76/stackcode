import { Text } from "@welcome-ui/text";
import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import Form from "./Form";
import { Link } from "react-router-dom";

// loga i ilustracje
import GoogleLogo from "../../assets/googlelogo.png";
import GithubLogo from "../../assets/githublogo.png";
import StackcodeLogo from "../../assets/logo3.png";

const RightSection = () => {
  return (
    <Box w={{ _: "100%", md: "50%" }}>
      {/* link z logiem */}
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

      <Box maxWidth={450} mx="auto" mt="10%" p="2rem" h="75%">
        <Text variant="h1">Zaloguj się</Text>

        {/* forumlarz */}
        <Form />

        {/* linia z "lub" na środku */}
        <Flex alignItems="center">
          <div className="h-line"></div>
          <Text color="gray" p=".5rem" children="lub" />
          <div className="h-line"></div>
        </Flex>

        <Flex direction="column" gap=".5rem">
          {/* logowanie za pomocą google */}
          <a href="http://localhost:3000/api/auth/google" className="login-provider-card">
            <img src={GoogleLogo} height={40} width={40} />
            <Text>Kontynuuj za pomocą Google</Text>
          </a>

          {/* logowanie za pomocą google */}
          <a href="http://localhost:3000/api/auth/google" className="login-provider-card">
            <img src={GithubLogo} height={40} width={40} />
            <Text>Kontynuuj za pomocą Github</Text>
          </a>
        </Flex>
      </Box>

      {/* stopka */}
      <Flex
        h="15%"
        bg="dark-green"
        color="white"
        justify="center"
        align="center"
        className="right-side-footer"
        display={{ _: "flex", md: "none" }}>
        <Text px="10%">
          Zalogowanie się do twojego konta STACKCODE umożliwia ci zadawanie pytań, odpowiadanie na nie i co
          najważniejsze zdobywanie wiedzy
        </Text>
      </Flex>
    </Box>
  );
};

export default RightSection;

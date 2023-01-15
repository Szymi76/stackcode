import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";
import { Flex } from "@welcome-ui/flex";
import { Link } from "react-router-dom";

// zdjęcia
import StackcodeLogo from "../../assets/logo3.png";
import Ilustration from "../../assets/registerIlustration.png";

const LeftSection = () => {
  return (
    <Box w="50%" borderRight="1px solid" borderColor="light-gray" bg="white" display={{ _: "none", md: "block" }}>
      {/* logo z linkiem */}
      <Link to={"/home"}>
        <Box h="15%" bg="green" textAlign="center">
          <img src={StackcodeLogo} height="100%" style={{ margin: "auto" }} />
        </Box>
      </Link>

      {/* trójkąt */}
      <Box h="15%">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#3AAFA9" fill-opacity="1" d="M0,320L1440,64L1440,0L0,0Z"></path>
        </svg>
      </Box>

      {/* ilustracja */}
      <Box textAlign="center" position="relative" h="55%">
        <img src={Ilustration} className="auth-ilustration" />
      </Box>

      {/* stopka */}
      <Flex h="15%" bg="dark-green" color="white" justify="center" align="center">
        <Text px="10%">
          Zalogowanie się do twojego konta STACKCODE umożliwia ci zadawanie pytań, odpowiadanie na nie i co
          najważniejsze zdobywanie wiedzy
        </Text>
      </Flex>
    </Box>
  );
};

export default LeftSection;

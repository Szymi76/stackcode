import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { Text } from "@welcome-ui/text";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Ilustration from "../../assets/Coding.png";

const Welcome = () => {
  return (
    <>
      <Flex h={{ _: "auto", md: "50vh" }} minH="450px" pt="13vh" align="start">
        {/* ilustracja */}
        <Flex align="center" display={{ _: "none", md: "flex" }}>
          <img src={Ilustration} className="home-ilustration" />
        </Flex>

        <Flex
          direction="column"
          align={{ _: "center", md: "start" }}
          justify="start"
          w="100%"
          pl={{ _: "o", md: "2rem" }}
          className="fade-in">
          {/* tekst */}
          <Text
            variant="h1"
            maxW="35rem"
            textAlign={{ _: "center", md: "left" }}
            children="Jedyne w swoim rodzaju forum dla programistów"
          />
          {/* </motion.div> */}

          {/* lista */}
          <ul id="home-list">
            <li>Zadawaj pytania</li>
            <li>Pomagaj innym</li>
            <li>Zdobywaj wiedzę</li>
          </ul>

          {/* przycisk */}
          <Link to="/zadaj-pytanie" style={{ textDecoration: "none" }}>
            <Button size="lg" w="12rem" ml={{ _: "0", md: "1.5rem" }} mt=".5rem">
              <Text fontSize="1.4em" fontWeight="500" children="Rozpocznij" />
              <ArrowLongRightIcon />
            </Button>
          </Link>
        </Flex>
      </Flex>

      {/* skos kolejnej sekcji */}
      <Box display={{ _: "none", md: "block" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#2b7a78" fillOpacity="1" d="M0,224L1440,64L1440,320L0,320Z"></path>
        </svg>
      </Box>
    </>
  );
};

export default Welcome;

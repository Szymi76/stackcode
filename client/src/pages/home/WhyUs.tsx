import { useRef } from "react";
import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";
import useOnScreen from "../../hooks/useOnScreen";
import axios from "axios";

const WhyUs = () => {
  const test = async () => {
    const res = await axios.post("https://stackcode.win/api/test", { a: "1" }, { withCredentials: true });
    console.log(res);
    console.log(res.data);
  };

  return (
    <Box position="relative" mt={{ _: "1.5rem", md: "-1rem" }}>
      {/* tekst */}
      <Flex
        direction={{ _: "column", md: "row" }}
        h={{ _: "auto", md: "30vh" }}
        bg="dark-green"
        justify="space-evenly"
        align="center"
        textAlign={{ _: "center", md: "left" }}
        p=".5rem">
        <Text variant="h1" color="white" children="Dlaczego my?" />
        <Text maxW="25rem" fontSize="1.2em" color="white">
          Nasze forum to miejsce, gdzie znajdziesz odpowiedzi na nawet najtrudniejsze pytania dotyczące programowania.
          Zebraliśmy tu grupę utalentowanych i doświadczonych programistów, którzy chętnie dzielą się swoją wiedzą i
          doświadczeniem. Poza tym, nasze forum to także świetne miejsce do nawiązania nowych znajomości i wymiany
          poglądów z innymi osobami z branży. Dołącz do nas i korzystaj z wiedzy i inspiracji, jakie oferuje nasze forum
        </Text>
        <Text children="TEST" onClick={test} />
      </Flex>

      {/* drugi skos */}
      <Box display={{ _: "none", md: "block" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#2b7a78" fillOpacity="1" d="M0,96L1440,192L1440,0L0,0Z"></path>
        </svg>
      </Box>
    </Box>
  );
};

export default WhyUs;

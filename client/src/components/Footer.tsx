import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { Text } from "@welcome-ui/text";
import { Link } from "react-router-dom";
import useToast from "../hooks/useToast";

const Footer = () => {
  const toast = useToast();

  const handleClick = () => {
    toast("Na ten moment brak takiej możliwości");
  };

  return (
    <Box id="footer" bg="black" color="white" px="5rem" py="2rem">
      <Box mx="auto">
        <Flex wrap="wrap" pb="1rem" columnGap="5rem" rowGap="2.5rem" mx="auto">
          {/* forum */}
          <Flex direction="column" gap=".5rem">
            <Text variant="h3" fontWeight="500" color="white" children="Forum" />
            <Link to="/zadaj-pytanie" children="Zadaj pytanie" className="footer-link" />
            <Link to="/szukaj" children="Wyszukiwarka" className="footer-link" />
          </Flex>

          {/* role */}
          <Flex direction="column" gap=".5rem">
            <Text variant="h3" fontWeight="500" color="white" children="Role" />
            <Link to="/home" children="Jak zostać ekspertem?" className="footer-link" onClick={handleClick} />
            <Link to="/home" children="Jak zostać moderatorem?" className="footer-link" onClick={handleClick} />
          </Flex>

          {/* socials */}
          <Flex direction="column" gap=".5rem">
            <Text variant="h3" fontWeight="500" color="white" children="Socials" />
            <Link to="https://github.com/Szymi76/stackcode" children="Github" className="footer-link" />
            <Link to="https://www.figma.com/file/IHLTmF5kjApo2rV9oMw94t" children="Figma" className="footer-link" />
          </Flex>
        </Flex>
        <Text variant="body2" fontWeight="200" children="@ 2023 • STACKCODE PROJEKT FORUM DLA PROGRAMISTÓW" />
      </Box>
    </Box>
  );
};

export default Footer;

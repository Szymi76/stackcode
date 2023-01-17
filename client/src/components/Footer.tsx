import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { Text } from "@welcome-ui/text";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box bg="black" color="white" px="5rem" py="2rem">
      <Flex wrap="wrap" pb="1rem" columnGap="5rem" rowGap="2.5rem" mx="auto">
        {/* forum */}
        <Flex direction="column" gap=".5rem">
          <Text variant="h3" fontWeight="500" color="white" children="Forum" />
          <Link to="/#" children="Zadaj pytanie" className="footer-link" />
          <Link to="/#" children="Odpowiedz na pytania" className="footer-link" />
          <Link to="/#" children="Wyszukiwarka" className="footer-link" />
        </Flex>

        {/* role */}
        <Flex direction="column" gap=".5rem">
          <Text variant="h3" fontWeight="500" color="white" children="Role" />
          <Link to="/#" children="Jak zostać ekspertem?" className="footer-link" />
          <Link to="/#" children="Jak zostać moderatorem?" className="footer-link" />
        </Flex>

        {/* socials */}
        <Flex direction="column" gap=".5rem">
          <Text variant="h3" fontWeight="500" color="white" children="Socials" />
          <Link to="/#" children="Github" className="footer-link" />
          <Link to="/#" children="Figma" className="footer-link" />
          <Link to="/#" children="Twitter" className="footer-link" />
        </Flex>
      </Flex>
      <Text variant="body2" fontWeight="200" children="@ 2023 • STACKCODE PROJEKT FORUM DLA PROGRAMISTÓW" />
    </Box>
  );
};

export default Footer;

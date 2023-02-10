import Ilustration from "../assets/404.png";
import { useNavigate } from "react-router-dom";

// komponenty
import { Text } from "@welcome-ui/text";
import { Button } from "@welcome-ui/button";
import { Stack } from "@welcome-ui/stack";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Stack bg="very-light-green" minH="100vh" pt="5rem" alignItems="center">
      <Text variant="h2" textAlign="center" children="Strona nie istnieje lub została usunięta" mb="0" />
      <Text
        variant="body2"
        color="gray"
        children="Jeśli wpisywałeś lub wklejałeś link, sprawdź czy zrobiłeś to poprawnie"
        textAlign="center"
        px="2rem"
      />
      <Button children="Wróć do strony głównej" mb="5vh" onClick={() => navigate("/home")} />
      <img src={Ilustration} style={{ maxHeight: "50vh", maxWidth: "95vw" }} />
    </Stack>
  );
};

export default NotFound;

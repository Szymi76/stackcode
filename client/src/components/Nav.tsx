import { useState } from "react";
import StackcodeLogo from "../assets/logo3.png";
import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";
import { Button } from "@welcome-ui/button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { setUser } from "../features/auth/authSlice";

const Nav = () => {
  const dispatch = useAppDispatch();
  const [showUserMenu, setShowUserMemu] = useState(false);
  const [menuToggled, setMenuToggled] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleToggleUserMenu = () => {
    setShowUserMemu(!showUserMenu);
  };

  const toggleMenu = () => {
    setMenuToggled(!menuToggled);
  };

  const handleLogout = async () => {
    await logout();
    dispatch(setUser(null));
    toggleMenu();
  };

  return (
    <Flex
      h={{ _: menuToggled ? "100vh" : "4rem", md: "4rem" }}
      bg="green"
      justify={{ _: "start", md: "space-between" }}
      align="center"
      px="1rem"
      position="fixed"
      w="100%"
      flexDirection={{ _: "column", md: "row" }}>
      {/* logo */}
      <Link to="/home">
        <img src={StackcodeLogo} height="100%" style={{ maxHeight: "4rem" }} />
      </Link>

      <Flex h="100%" align={{ _: "start", md: "center" }} display={{ _: menuToggled ? "flex" : "none", md: "flex" }}>
        {/* linki */}
        <Flex
          align="center"
          justify="start"
          mr={{ _: "0", md: "2rem" }}
          fontSize={{ _: "1.75em", md: "md" }}
          mt={{ _: "3rem", md: "0" }}
          gap="1.25rem"
          flexDirection={{ _: "column", md: "row" }}>
          <Link to="/zadaj-pytanie" className="nav-link" children={"Zadaj pytanie"} />
          <Link to="/forum" className="nav-link" children={"Forum"} />
          <Link to="/blog" className="nav-link" children={"Blog"} />
          <Link to="/szukaj" className="nav-link" children={"Szukaj"} />
          <Flex direction="column" gap="1.25rem" display={{ _: !menuToggled ? "none" : "flex", md: "none" }}>
            {!user && <Link to="/zaloguj-sie" className="nav-link" children={"Zaloguj się"} />}
            {user && <Link to="/twoj-profil" className="nav-link" children={"Twój profil"} />}
            {user && <Link to="/home" className="nav-link" children={"Wyloguj się"} onClick={handleLogout} />}
            <XMarkIcon height={55} color="white" style={{ marginTop: "1rem" }} cursor="pointer" onClick={toggleMenu} />
          </Flex>
        </Flex>
        {/* awatar użytkownika lub przycisk do logowania */}
        <Box h="100%" display={{ _: "none", md: "block" }}>
          {user ? (
            <Flex h="100%" align="center">
              <img
                src={user.photoURL}
                height={"65%"}
                style={{ borderRadius: "9999px", cursor: "pointer" }}
                onClick={handleToggleUserMenu}
              />
              {showUserMenu && <UserMenu />}
            </Flex>
          ) : (
            <Button onClick={() => navigate("/zaloguj-sie")} children="Zaloguj się" />
          )}
        </Box>
      </Flex>
      <Box position="absolute" right="1rem" top=".5rem" display={{ _: menuToggled ? "none" : "block", md: "none" }}>
        <Bars3BottomRightIcon height={45} cursor="pointer" onClick={toggleMenu} />
      </Box>
    </Flex>
  );
};

export default Nav;

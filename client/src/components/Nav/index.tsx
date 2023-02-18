import React, { useRef, useState } from "react";
import StackcodeLogo from "../../assets/logo3.png";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUser } from "../../features/auth/authSlice";
import { useLogoutMutation } from "../../features/auth/authApiSlice";

// komponenty
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import UserMenu from "../UserMenu";
import { Wrapper } from "./Content";
import { Flex } from "@welcome-ui/flex";
import { Button } from "@welcome-ui/button";
import { Box } from "@welcome-ui/box";
import * as Links from "./Links";

const Nav = () => {
  const dispatch = useAppDispatch();
  const [userMenuVisible, setUserMemuVisible] = useState(false);
  const [navToggled, setNavToggled] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const userMenuRef = useRef<HTMLDivElement>(null);
  const profilePhotoRef = useRef<HTMLImageElement>(null);

  const toggleNav = () => setNavToggled(!navToggled);
  const toggleUserMenuVisibility = () => setUserMemuVisible(!userMenuVisible);

  useOnClickOutside(userMenuRef, toggleUserMenuVisibility, profilePhotoRef);

  // wylogowywanie użytkownika
  const handleLogout = async () => {
    await logout();
    dispatch(setUser(null));
    toggleNav();
  };

  const handleClickOnInfoLink = () => {
    toggleNav();
    scrollTo({ top: 9999, behavior: "smooth" });
  };

  return (
    <Wrapper navToggled={navToggled}>
      {/* logo po lewej */}
      <img
        src={StackcodeLogo}
        height="100%"
        style={{ maxHeight: "4rem", cursor: "pointer" }}
        onClick={() => navigate("/home")}
      />

      <Flex h="100%" align={{ _: "start", md: "center" }} display={{ _: navToggled ? "flex" : "none", md: "flex" }}>
        {/* lista linków */}
        <Links.Wrapper>
          <Links.Single to="/zadaj-pytanie" text="Zadaj pytanie" onClick={toggleNav} />
          <Links.Single to="/szukaj" text="Szukaj" onClick={toggleNav} />
          <Links.Single to="/home" text="Informacje" onClick={handleClickOnInfoLink} />

          {/* linki widoczne tylko w wersji responsywnej */}
          <Links.ResnponsiveWrapper navToggled={navToggled}>
            {!user && <Links.Single to="/zaloguj-sie" text="Zaloguj się" onClick={toggleNav} />}
            {user && <Links.Single to="/twoj-profil" text="Twój profil" onClick={toggleNav} />}
            {user && <Links.Single to={location.hash} text="Wyloguj się" onClick={handleLogout} />}
            <XMarkIcon height={55} color="white" style={{ marginTop: "1rem" }} cursor="pointer" onClick={toggleNav} />
          </Links.ResnponsiveWrapper>
        </Links.Wrapper>

        <Flex h="100%" align="center" display={{ _: "none", md: "flex" }}>
          {user ? (
            // pokazanie awatara użytkownika jeśli jest zalogowany
            <Flex h="100%" align="center">
              <img
                ref={profilePhotoRef}
                src={user.photoURL}
                height={45}
                width={45}
                style={{ borderRadius: "9999px", cursor: "pointer" }}
                onClick={toggleUserMenuVisibility}
              />

              {/* @ts-ignore */}
              {userMenuVisible && (
                <UserMenu ref={userMenuRef} navigate={navigate} user={user} handleLogout={handleLogout} />
              )}
            </Flex>
          ) : (
            // przycisk do logowania dla nawigatora
            <Button onClick={() => navigate("/zaloguj-sie")} children="Zaloguj się" />
          )}
        </Flex>
      </Flex>

      {/* ikona do togglowania menu hamburger */}
      <Box position="absolute" right="1rem" top=".5rem" display={{ _: navToggled ? "none" : "block", md: "none" }}>
        <Bars3BottomRightIcon height={45} cursor="pointer" onClick={toggleNav} />
      </Box>
    </Wrapper>
  );
};

export default Nav;

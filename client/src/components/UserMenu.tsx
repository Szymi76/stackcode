import { RefObject, forwardRef, ForwardedRef, Ref } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setUser } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { useNavigate, NavigateFunction } from "react-router-dom";

// komponenty
import { Flex } from "@welcome-ui/flex";
import { Text } from "@welcome-ui/text";
import { Box } from "@welcome-ui/box";
import { UserIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import User from "../types/User";

type UserMenuProps = { handleLogout: () => void; navigate: NavigateFunction; user: User };

const UserMenu = forwardRef<HTMLDivElement, UserMenuProps>(({ user, handleLogout, navigate }, ref) => (
  <div ref={ref} id="user-menu">
    {/* awatar i nazwa użytkownika */}
    <Flex h="100%" align="center" gap=".75rem" p={0}>
      <img src={user?.photoURL} height={50} width={50} style={{ borderRadius: "9999px" }} />
      <Text variant="body1" fontWeight={600} children={user?.displayName} />
    </Flex>

    {/* adres email */}
    <Text mt=".5rem" mb="2rem" children={user?.email} />

    {/* przycisk do profilu */}
    <Box className="user-menu-link" py=".25rem" onClick={() => navigate("/twoj-profil")}>
      <UserIcon color="gray" height="2rem" />
      <Text fontSize="sm" fontWeight={600} color="gray" children="Twój profil" />
    </Box>

    {/* przycisk do wylogowania */}
    <Box className="user-menu-link" py=".25rem" onClick={handleLogout}>
      <ArrowLeftOnRectangleIcon color="gray" height="2rem" />
      <Text fontSize="sm" fontWeight={600} color="gray" children="Wyloguj się" />
    </Box>
  </div>
));

export default UserMenu;

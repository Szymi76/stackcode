import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { Text } from "@welcome-ui/text";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { setUser } from "../features/auth/authSlice";

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    dispatch(setUser(null));
  };

  const redirectToProfile = () => navigate("/twoj-profil");

  return (
    <div id="user-menu">
      <Flex h="100%" align="center" gap=".75rem" p={0}>
        <img src={user?.photoURL} height={50} style={{ borderRadius: "9999px" }} />
        <Text variant="body1" fontWeight={600} children={user?.displayName} />
      </Flex>
      <Text variant="body2" mt=".5rem" mb="2rem" children={user?.email} />
      <Box className="user-menu-link" onClick={redirectToProfile}>
        <UserIcon color="gray" height="2rem" />
        <Text variant="body2" color="gray" children="Twój profil" />
      </Box>
      <Box className="user-menu-link" onClick={handleLogout}>
        <ArrowLeftOnRectangleIcon color="gray" height="2rem" />
        <Text variant="body2" color="gray" children="Wyloguj się" />
      </Box>
    </div>
  );
};

export default UserMenu;

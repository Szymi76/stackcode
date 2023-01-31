import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setUser } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";

// komponenty
import { Flex } from "@welcome-ui/flex";
import { Text } from "@welcome-ui/text";
import { Box } from "@welcome-ui/box";
import { UserIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

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
      {/* awatar i nazwa użytkownika */}
      <Flex h="100%" align="center" gap=".75rem" p={0}>
        <img src={user?.photoURL} height={50} width={50} style={{ borderRadius: "9999px" }} />
        <Text variant="body1" fontWeight={600} children={user?.displayName} />
      </Flex>

      {/* adres email */}
      <Text variant="body2" mt=".5rem" mb="2rem" children={user?.email} />

      {/* przycisk do profilu */}
      <Box className="user-menu-link" onClick={redirectToProfile}>
        <UserIcon color="gray" height="2rem" />
        <Text variant="body2" fontWeight={500} color="gray" children="Twój profil" />
      </Box>

      {/* przycisk do wylogowania */}
      <Box className="user-menu-link" onClick={handleLogout}>
        <ArrowLeftOnRectangleIcon color="gray" height="2rem" />
        <Text variant="body2" fontWeight={500} color="gray" children="Wyloguj się" />
      </Box>
    </div>
  );
};

export default UserMenu;

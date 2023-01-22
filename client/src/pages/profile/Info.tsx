import React from "react";
import { useAppSelector } from "../../app/hooks";
import { useMatch, useNavigate } from "react-router-dom";
import { Box } from "@welcome-ui/box";
import { Flex } from "@welcome-ui/flex";
import { Button } from "@welcome-ui/button";
import { Text } from "@welcome-ui/text";
import { Stack } from "@welcome-ui/stack";

const Info = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  let roles: string[] = [];
  if (user) roles = user.roles.filter((role) => role != "user");
  if (roles?.length == 0) roles = ["brak"];

  return (
    <Stack>
      <Text variant="h2" my=".25rem" children="Profil" />
      <Flex
        wrap="wrap"
        columnGap="3rem"
        bg="white"
        border="1px solid"
        borderColor="light-gray"
        borderRadius={5}
        p="1rem">
        {/* awatar */}
        <Box>
          <Text color="gray" children="Awatar" />
          <img src={user?.photoURL} height={75} width={75} style={{ borderRadius: "9999px" }} />
        </Box>

        {/* twoja nazwa */}
        <Box>
          <Text color="gray" children="Twoja nazwa" />
          <Text fontWeight="500" children={user?.displayName} />
        </Box>

        {/* adres email*/}
        <Box>
          <Text color="gray" children="Adres email" />
          <Text fontWeight="500" children={user?.email} />
        </Box>

        {/* email zweryfikowany */}
        <Box>
          <Text color="gray" children="Email zweryfikowany" />
          <Text fontWeight="500" children={user?.emailVerified ? "Tak" : "Nie"} />
        </Box>

        {/* Role */}
        <Box>
          <Text color="gray" children="Role" />
          {roles!.map((role, i) => (
            <Text key={`role-${i}`} fontWeight="500" children={role} />
          ))}
        </Box>
      </Flex>
      {/* przyciski */}
      <Flex gap=".5rem">
        <Button children="Ustawienia" onClick={() => navigate("/ustawienia")} />
        <Button children="Zadaj pytanie" onClick={() => navigate("/zadaj-pytanie")} />
      </Flex>
    </Stack>
  );
};

export default Info;

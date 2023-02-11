import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

// komponenty
import Marked from "./QuestionsList/Marked";
import Created from "./QuestionsList/Created";
import { Text } from "@welcome-ui/text";
import { Flex } from "@welcome-ui/flex";
import { Button } from "@welcome-ui/button";
import * as Info from "./Info";
import * as Content from "./Content";

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  let roles: string[] = [];
  if (user) roles = user.roles.filter((role) => role != "user");
  if (roles?.length == 0) roles = ["brak"];

  document.title = "Profil";

  return (
    <Content.Wrapper>
      {/* info */}
      <Info.Wrapper>
        {/* lista informacji */}
        <Info.List>
          <Info.Single label="Awatar">
            <img src={user?.photoURL} height={75} width={75} style={{ borderRadius: "9999px" }} />
          </Info.Single>

          <Info.Single label="Twoja nazwa">
            <Text fontWeight="500" children={user?.displayName} />
          </Info.Single>

          <Info.Single label="Adres email">
            <Text fontWeight="500" children={user?.email} />
          </Info.Single>

          <Info.Single label="Email zweryfikowany">
            <Text fontWeight="500" children={user?.emailVerified ? "Tak" : "Nie"} />
          </Info.Single>

          <Info.Single label="Role">
            {roles!.map((role, i) => (
              <Text key={`role-${i}`} fontWeight="500" children={role} />
            ))}
          </Info.Single>
        </Info.List>
        {/* przyciski */}
        <Flex gap=".5rem">
          <Button children="Ustawienia" onClick={() => navigate("/ustawienia/twoja-nazwa")} />
          <Button children="Zadaj pytanie" onClick={() => navigate("/zadaj-pytanie")} />
        </Flex>
      </Info.Wrapper>

      {/* zaznaczone pytania */}
      <Marked />

      {/* stworzone pytania */}
      <Created />
    </Content.Wrapper>
  );
};

export default Profile;

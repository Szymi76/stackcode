import { CreateWuiComponent } from "@welcome-ui/system";
import { Button, ButtonProps, StyledButton } from "@welcome-ui/button";
import { Loader } from "@welcome-ui/loader";

type AsyncButtonProps = typeof Button & { isLoading: boolean; text: string };

const AsyncButton = () => {
  // return (
  //   // <Button {...props} disabled={props.isLoading}>
  //   //   {props.isLoading && <Loader color="white" size="xs" mr=".5rem" />}
  //   //   {props.text}
  //   // </Button>
  // );
  return <></>;
};

export default AsyncButton;

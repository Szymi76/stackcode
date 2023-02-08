import { Button, ButtonProps } from "@welcome-ui/button";
import { Loader } from "@welcome-ui/loader";

type AsyncButtonProps = ButtonProps;

const AsyncButton = (props: AsyncButtonProps) => {
  return (
    <Button {...props}>
      {props.disabled && <Loader color="white" size="xs" mr=".5rem" />}
      {props.children}
    </Button>
  );
};

export default AsyncButton;

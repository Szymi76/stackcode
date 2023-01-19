import { Toast as UIToast } from "@welcome-ui/toast";
import { Box } from "@welcome-ui/box";

const Toast = () => {
  return (
    <UIToast.Growl variant="info">
      <UIToast.Title>Lorem ipsum dolor sit amet</UIToast.Title>
      Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
      <Box mt="sm"></Box>
    </UIToast.Growl>
  );
};

export default Toast;

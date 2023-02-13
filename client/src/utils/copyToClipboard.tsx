import { Text } from "@welcome-ui/text";
import { Toast, UseToastReturn } from "@welcome-ui/toast";

type copyToClipboardArgs = {
  toast: UseToastReturn;
  toCopy: string;
  text: string;
};

const copyToClipboard = ({ toast, toCopy, text }: copyToClipboardArgs) => {
  window.navigator.clipboard.writeText(toCopy);

  toast(
    // @ts-ignore
    <Toast.Snackbar p=".5rem" variant="success" hasCloseButton={false}>
      <Text variant="body2" m="0" children={text} />
    </Toast.Snackbar>
  );
};

export default copyToClipboard;

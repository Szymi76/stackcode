import { Text } from "@welcome-ui/text";
import { Toast, UseToastReturn } from "@welcome-ui/toast";

export type ToastInfoProps = (toast: UseToastReturn, text: string) => void;

export const showInfoToast: ToastInfoProps = (toast, text) => {
  toast(
    // @ts-ignore
    <Toast.Snackbar p=".5rem" variant="info" hasCloseButton={false}>
      <Text variant="body2" m="0" children={text} />
    </Toast.Snackbar>
  );
};

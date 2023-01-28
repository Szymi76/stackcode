import { Text } from "@welcome-ui/text";
import { Toast, UseToastReturn } from "@welcome-ui/toast";
import React from "react";

type ToastInfoProps = (toast: UseToastReturn, text: string) => void;

const infoToast: ToastInfoProps = (toast, text) => {
  toast(
    // @ts-ignore
    <Toast.Snackbar p=".5rem" variant="info" hasCloseButton={false}>
      <Text variant="body2" m="0" children={text} />
    </Toast.Snackbar>
  );
};

export default infoToast;

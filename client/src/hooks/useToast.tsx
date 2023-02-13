import { Text } from "@welcome-ui/text";
import { useToast as useDefaultToast, Toast } from "@welcome-ui/toast";

const useToast = () => {
  const defaultToast = useDefaultToast();

  const toast = (text: string) => {
    defaultToast(
      <Toast.Snackbar
        px="1rem"
        py=".75rem"
        icon={<></>}
        onClose={() => {}}
        hasCloseButton={false}
        bg="#def2f1"
        borderColor="#57cfc8">
        <Text m="0" fontWeight="500" children={text} fontFamily="Work Sans,sans-serif" />
      </Toast.Snackbar>
    );
  };

  return toast;
};

export default useToast;

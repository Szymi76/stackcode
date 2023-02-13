import useToast from "./useToast";

const useCopyToClipboard = () => {
  const toast = useToast();

  const copyToClipboard = (textToBeCopied: string, whatIsBeingCopied?: string, fullToastText?: string) => {
    window.navigator.clipboard.writeText(textToBeCopied);

    if (fullToastText) toast(fullToastText);
    else if (whatIsBeingCopied) toast(`Skopiowano ${whatIsBeingCopied} do schowka`);
    else toast("Skopiowano so schowka");
  };

  return copyToClipboard;
};

export default useCopyToClipboard;

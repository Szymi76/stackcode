// https://usehooks.com/useOnClickOutside/

import { useEffect, RefObject } from "react";

function useOnClickOutside<T1, T2>(ref: RefObject<T1>, handler: (event: any) => void, avoidRef?: RefObject<T2>) {
  useEffect(
    () => {
      const listener = (event: any) => {
        // Do nothing if clicking ref's element or descendent elements
        // @ts-ignore
        if (!ref.current || ref.current.contains(event.target)) return;

        // @ts-ignore
        if (avoidRef && avoidRef.current && avoidRef.current.contains(event.target)) return;

        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

export default useOnClickOutside;

import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

import "altcha";
import { backendURL } from "src/lib/consts";

interface AltchaProps {
  onStateChange?: (ev: Event | CustomEvent) => void;
}

export const Altcha = forwardRef<{ value: string | null }, AltchaProps>(
  ({ onStateChange }, ref) => {
    const widgetRef = useRef<HTMLElement>(null);
    const [value, setValue] = useState<string | null>(null);

    useImperativeHandle(
      ref,
      () => {
        return {
          get value() {
            return value;
          },
        };
      },
      [value]
    );

    useEffect(() => {
      const handleStateChange = (ev: Event | CustomEvent) => {
        if ("detail" in ev) {
          setValue(ev.detail.payload || null);
          onStateChange?.(ev);
        }
      };

      const { current } = widgetRef;

      if (current) {
        current.addEventListener("statechange", handleStateChange);
        return () =>
          current.removeEventListener("statechange", handleStateChange);
      }
    }, [onStateChange]);

    return (
      <altcha-widget
        ref={widgetRef}
        style={{
          "--altcha-max-width": "100%",
        }}
        challengeurl={backendURL + "/auth/altcha-challenge"}
      />
    );
  }
);

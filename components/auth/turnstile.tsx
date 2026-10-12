"use client";

import * as React from "react";

// Rebuilt from the original site's Turnstile wrapper (chunk 5105, module 95297).
// NOTE: original used Google Identity Services + Cloudflare Turnstile - scripts were lost with the site
const TURNSTILE_SITE_KEY = "0x4AAAAAADnd5vo_DhD_knHW";

export function isTurnstileConfigured() {
  return !!TURNSTILE_SITE_KEY.trim();
}

export function requiresTurnstileToken(token: string) {
  return isTurnstileConfigured() && !token.trim();
}

export function resetTurnstile(onVerify: (token: string) => void, ref: React.RefObject<{ reset: () => void } | null>) {
  onVerify("");
  ref.current?.reset();
}

type TurnstileProps = {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
};

type TurnstileHandle = { reset: () => void };

// NOTE: original used Google Identity Services + Cloudflare Turnstile - scripts were lost with the site
const TurnstileBox = React.forwardRef<TurnstileHandle, TurnstileProps>(function TurnstileBox(
  { onVerify, onExpire, onError },
  ref
) {
  const innerRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => ({
    reset() {
      innerRef.current?.replaceChildren();
      onVerify("");
    },
  }));

  if (!TURNSTILE_SITE_KEY.trim()) return null;

  return <div ref={innerRef} data-sitekey={TURNSTILE_SITE_KEY} />;
});

export { TurnstileBox as Turnstile };
export default TurnstileBox;

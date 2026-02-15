export type TgWebApp = {
  expand: () => void;
  close: () => void;
  ready: () => void;
  sendData: (data: string) => void;
  openLink: (url: string) => void;
  MainButton: {
    show: () => void;
    hide: () => void;
    setText: (text: string) => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
  };
  themeParams?: Record<string, string>;
  initDataUnsafe?: any;
};

export function getTg(): TgWebApp | null {
  if (typeof window === "undefined") return null;
  // @ts-ignore
  return window?.Telegram?.WebApp ?? null;
}

export function inTelegram(): boolean {
  return !!getTg();
}

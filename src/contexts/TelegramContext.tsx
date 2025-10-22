import { createContext } from "react";
import type { TelegramUser, TelegramWebApp } from "src/shared/types";

export interface TelegramContextType {
  isReady: boolean;
  isInTelegram: boolean;
  user: TelegramUser | null;
  webApp: TelegramWebApp | null;
  showBackButton: () => void;
  hideBackButton: () => void;
  showMainButton: (text: string, onClick: () => void) => void;
  hideMainButton: () => void;
}

export const TelegramContext = createContext<TelegramContextType | undefined>(
  undefined
);

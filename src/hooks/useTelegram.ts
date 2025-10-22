import { TelegramContext } from "@/contexts/TelegramContext";
import { useContext } from "react";

const useTelegramContext = () => {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error(
      "useTelegramContext must be used within a TelegramProvider"
    );
  }
  return context;
};

export const useTelegram = () => {
  const {
    isReady,
    isInTelegram,
    webApp,
    showBackButton,
    hideBackButton,
    showMainButton,
    hideMainButton,
  } = useTelegramContext();

  return {
    isReady,
    isInTelegram,
    webApp,
    showBackButton,
    hideBackButton,
    showMainButton,
    hideMainButton,
  };
};

export const useTelegramUser = () => {
  const { user } = useTelegramContext();
  return user;
};

import React, { useEffect, useState } from "react";
import { init, backButton } from "@telegram-apps/sdk";
import type { TelegramUser } from "src/shared/types";
import { TelegramContext, type TelegramContextType } from "./TelegramContext";

interface TelegramProviderProps {
  children: React.ReactNode;
}

export const TelegramProvider: React.FC<TelegramProviderProps> = ({
  children,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [isInTelegram, setIsInTelegram] = useState(false);
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    const initializeTelegram = async () => {
      try {
        // Initialize Telegram SDK
        await init();

        // Check if running in Telegram
        const tg = window.Telegram?.WebApp;
        const inTelegram = tg?.initDataUnsafe?.user !== undefined;
        setIsInTelegram(inTelegram);

        if (inTelegram && tg) {
          setUser(tg.initDataUnsafe.user || null);
          tg.ready();
          tg.expand();
        }

        setIsReady(true);
      } catch (error) {
        console.error("Failed to initialize Telegram SDK:", error);
        setIsReady(true); // Still allow app to work in non-Telegram environment
      }
    };

    initializeTelegram();
  }, []);

  // Handle back button - simplified without routing
  useEffect(() => {
    if (!isReady || !isInTelegram) return;

    const handleBackButton = () => {
      // Close the app when back button is pressed
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.close();
      }
    };

    // Safely hide back button with error handling
    try {
      backButton.hide();
    } catch (error) {
      console.warn("Back button not available:", error);
    }

    return () => {
      try {
        backButton.offClick(handleBackButton);
      } catch (error) {
        console.warn("Error removing back button listener:", error);
      }
    };
  }, [isReady, isInTelegram]);

  const showBackButton = () => {
    if (isInTelegram) {
      try {
        backButton.show();
      } catch (error) {
        console.warn("Error showing back button:", error);
      }
    }
  };

  const hideBackButton = () => {
    if (isInTelegram) {
      try {
        backButton.hide();
      } catch (error) {
        console.warn("Error hiding back button:", error);
      }
    }
  };

  const showMainButton = (text: string, onClick: () => void) => {
    if (isInTelegram) {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.main_button.set_text(text);
        tg.main_button.show();
        tg.main_button.onClick(onClick);
      }
    }
  };

  const hideMainButton = () => {
    if (isInTelegram) {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.main_button.hide();
      }
    }
  };

  const value: TelegramContextType = {
    isReady,
    isInTelegram,
    user,
    webApp: window.Telegram?.WebApp || null,
    showBackButton,
    hideBackButton,
    showMainButton,
    hideMainButton,
  };

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
};

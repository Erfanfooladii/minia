import { useTelegram } from "@/hooks/useTelegram";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BackButtonHandler = () => {
  const { isReady, isInTelegram, showBackButton, hideBackButton, webApp } =
    useTelegram();
  const location = useLocation();

  useEffect(() => {
    if (!isReady || !isInTelegram || !webApp) return;

    const handleBack = () => {
      if (location.pathname === "/") {
        webApp.close();
      } else {
        window.history.back();
      }
    };

    showBackButton();
    webApp.back_button.onClick(handleBack);

    return () => {
      hideBackButton();
      webApp.back_button.offClick(handleBack);
    };
  }, [
    isReady,
    isInTelegram,
    location.pathname,
    webApp,
    showBackButton,
    hideBackButton,
  ]);

  return null;
};

export default BackButtonHandler;

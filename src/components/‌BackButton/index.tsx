import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTelegram } from "@/hooks/useTelegram";

const BackButtonHandler = () => {
  const { isReady, isInTelegram, webApp, showBackButton, hideBackButton } =
    useTelegram();

  const location = useLocation();

  useEffect(() => {
    if (!isReady || !isInTelegram || !webApp) return;

    const handleBack = () => {
      if (location.pathname === "/") {
        hideBackButton();
        webApp.close?.();
      } else {
        window.history.back();
      }
    };
    showBackButton();
    webApp.back_button.onClick(handleBack);
    return () => {
      webApp.back_button.offClick(handleBack);
      hideBackButton();
    };
  }, [
    isReady,
    isInTelegram,
    webApp,
    location.pathname,
    showBackButton,
    hideBackButton,
  ]);

  return null;
};

export default BackButtonHandler;

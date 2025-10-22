import { useTelegram } from "@/hooks/useTelegram";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BackButtonHandler = () => {
  const { isReady, isInTelegram, webApp } = useTelegram();
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

    try {
      webApp.back_button.show();
      webApp.back_button.onClick(handleBack);
    } catch (e) {
      console.warn("back_button not available", e);
    }

    return () => {
      try {
        webApp.back_button.offClick(handleBack);
        webApp.back_button.hide();
      } catch (e) {
        console.warn("Error cleaning up back_button", e);
      }
    };
  }, [isReady, isInTelegram, location.pathname, webApp]);

  return null;
};

export default BackButtonHandler;

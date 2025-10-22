import { useEffect } from "react";
import { useTelegram } from "@/hooks/useTelegram";
import { useNavigate } from "react-router-dom";

export const useTelegramBackButton = (onBack?: () => void) => {
  const { showBackButton, webApp, hideBackButton, isInTelegram } =
    useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInTelegram) return;
    showBackButton();
    const handleBack = onBack || (() => navigate(-1));

    webApp?.back_button.onClick(handleBack);

    return () => {
      hideBackButton();
      webApp?.back_button.offClick(handleBack);
    };
  }, [isInTelegram, showBackButton, hideBackButton, navigate, onBack]);
};

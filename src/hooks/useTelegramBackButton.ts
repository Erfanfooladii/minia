import { useEffect } from "react";
import { useTelegram } from "@/hooks/useTelegram";
import { useNavigate } from "react-router-dom";

/**
 * Hook to control Telegram back button behavior.
 * Automatically shows the Telegram back button and handles its click.
 *
 * @param onBack Optional custom callback to handle back button press.
 *               If not provided, it will navigate(-1) by default.
 */
export const useTelegramBackButton = (onBack?: () => void) => {
  const { showBackButton, hideBackButton, isInTelegram } = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInTelegram) return;

    // Show Telegram back button
    showBackButton();

    // Define what happens when user clicks back
    const handleBack = onBack || (() => navigate(-1));

    const tg = window.Telegram?.WebApp;
    tg?.back_button.onClick(handleBack);

    // Cleanup on unmount
    return () => {
      hideBackButton();
      tg?.back_button.offClick(handleBack);
    };
  }, [isInTelegram, showBackButton, hideBackButton, navigate, onBack]);
};

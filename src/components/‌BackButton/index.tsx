import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useBackButton } from "@tma.js/sdk-react";

export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backButton = useBackButton();

  useEffect(() => {
    if (!backButton) return;
    backButton.show();
    const handleClick = () => {
      if (location.pathname === "/") {
        backButton.hide();
      } else {
        navigate(-1);
      }
    };

    backButton.on("click", handleClick);

    return () => {
      backButton.off("click", handleClick);
      backButton.hide();
    };
  }, [backButton, location.pathname, navigate]);

  return null;
};

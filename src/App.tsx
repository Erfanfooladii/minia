import { Link, Outlet } from "react-router-dom";
import { Button } from "./components/ui/button";
import { useEffect } from "react";
import { useMainButton } from "@tma.js/sdk-react";

interface LinkItem {
  titile: string;
  path: string;
}

export default function App() {
  const mainButton = useMainButton();
  useEffect(() => {
    if (!mainButton) return;
    mainButton.setText("Test Erfan click");
    mainButton.show();
    const handleClick = () => console.log("MainButton clicked");
    mainButton.on("click", handleClick);
    return () => {
      mainButton.off("click", handleClick);
      mainButton.hide();
    };
  }, [mainButton]);
  const linkItems: LinkItem[] = [
    {
      titile: "Home",
      path: "/",
    },
    {
      titile: "Cart",
      path: "/cart",
    },
  ];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-center gap-6 py-4">
        {linkItems.map((link) => (
          <Button variant="outline">
            <Link to={link.path} className="underline-offset-4 hover:underline">
              {link.titile}
            </Link>
          </Button>
        ))}
      </header>
      <main className="px-3.5">
        <div className="mb-4 flex gap-2">
          <Button variant="secondary" onClick={() => mainButton?.show()}>
            Show MainButton
          </Button>
          <Button variant="secondary" onClick={() => mainButton?.hide()}>
            Hide MainButton
          </Button>
        </div>
        <Outlet />
      </main>
    </div>
  );
}

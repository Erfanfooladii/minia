import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import { useEffect } from "react";
import { useBackButton } from "@tma.js/sdk-react";

interface LinkItem {
  titile: string;
  path: string;
}

export default function App() {
  let navigate = useNavigate();

  const backButton = useBackButton();
  useEffect(() => {
    if (!backButton) return;
    backButton.show();
    const handleClick = () => {
      navigate(-1);
      console.log("MainButton clicked");
    };
    backButton.on("click", handleClick);
    return () => {
      backButton.off("click", handleClick);
      backButton.hide();
    };
  }, [backButton]);
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
        <Outlet />
      </main>
    </div>
  );
}

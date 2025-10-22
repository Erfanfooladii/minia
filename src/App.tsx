import { Link, Outlet } from "react-router-dom";
import { Button } from "./components/ui/button";
import { useTelegramBackButton } from "./hooks/useTelegramBackButton";

interface LinkItem {
  titile: string;
  path: string;
}

export default function App() {
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
  useTelegramBackButton();

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

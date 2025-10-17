// React import removed; using automatic JSX runtime
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { useCartStore } from "@/store/cart";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
};

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const inCart = useCartStore((s) =>
    s.items.some((i) => i.id === String(product.id))
  );
  const addToCartMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("https://fakestoreapi.com/carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1,
          date: new Date().toISOString(),
          products: [{ productId: product.id, quantity: 1 }],
        }),
      });
      if (!res.ok) throw new Error("Failed to add");
      return res.json();
    },
    onSuccess: () => {
      addItem({
        id: String(product.id),
        title: product.title,
        price: product.price,
      });
    },
  });
  const removeFromCartMutation = useMutation({
    mutationFn: async () => {
      removeItem(String(product.id));
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      try {
        const res = await fetch(
          `https://fakestoreapi.com/carts/${product.id}`,
          {
            method: "DELETE",
            signal: controller.signal,
          }
        );
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error("Failed to remove");
        return res.json();
      } catch (err) {
        addItem({
          id: String(product.id),
          title: product.title,
          price: product.price,
        });
        throw err;
      }
    },
  });
  // Removed manual mini app mounting; handled by provider when used

  const isProcessing =
    addToCartMutation.isPending || removeFromCartMutation.isPending;

  return (
    <Card className="flex flex-col justify-between w-64 h-60 p-4 shadow-md">
      <CardHeader className="p-0">
        <CardTitle className="text-lg font-semibold line-clamp-2">
          {product.title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mt-1">
          {product.description.length > 60
            ? product.description.slice(20, 60) + "..."
            : product.description.slice(20)}
        </CardDescription>
      </CardHeader>

      <div className="mt-auto pt-4">
        <Button
          className={`w-full ${
            inCart ? "bg-red-500 hover:bg-red-600" : "bg-primary"
          }`}
          disabled={isProcessing}
          onClick={() => {
            if (inCart) {
              removeFromCartMutation.mutate();
            } else {
              addToCartMutation.mutate();
            }
          }}
        >
          {isProcessing
            ? "Processing..."
            : inCart
            ? "Remove from cart"
            : "Add to cart"}
        </Button>
        {/* Telegram MainButton removed until SDK provider is configured */}
      </div>
    </Card>
  );
}

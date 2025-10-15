import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const totalQty = useCartStore((s) => s.totalQuantity());
  const total = useCartStore((s) => s.totalPrice());
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground p-6">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Cart</CardTitle>
          <CardDescription>Your selected items</CardDescription>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">No items yet.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {items.map((i) => (
                <li key={i.id} className="flex justify-between">
                  <span>
                    {i.title} × {i.qty}
                  </span>
                  <span>${(i.qty * i.price).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Qty: {totalQty} | Total: ${total.toFixed(2)}
            </span>
            <Button size="sm" variant="secondary" onClick={clear}>
              Clear
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

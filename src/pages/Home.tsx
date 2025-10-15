import { ProductCard } from "@/components/ProductCard/ProductCard";

import { useQuery } from "@tanstack/react-query";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
};
export default function Home() {
  const fetchProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
      <h1 className="text-2xl font-semibold">Products list</h1>

      <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {(error as Error).message}</p>}
        {data?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

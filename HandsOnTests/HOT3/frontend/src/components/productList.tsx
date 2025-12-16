import { ProductListItem } from "@/components/productListItem";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import axios from "axios";
import type { Product } from "@/types/product";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (products.length === 0) return <div>No products found.</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  console.log(products)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card key={product._id}>
          <CardContent className="pt-6">
            <ProductListItem product={product} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { ProductList };
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import axios from "axios";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";   // , CardContent
import { z } from "zod";
// import productEditSchema from "@/schemas/productEditSchema";

export function ProductDelete({ showError, showSuccess }: { showError: (message: string) => void; showSuccess: (message: string) => void }) {
  const {productId} = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // const [formData, setFormData] = useState({
  //   name: "",
  //   description: "",
  //   category: "",
  //   price: 0,
  // });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
        setProduct(response.data);
        // setFormData({
        //   name: response.data?.name || "",
        //   description: response.data?.description || "",
        //   category: response.data.category || "",
        //   price: response.data.price || 0,
        // })
        setLoading(false);
      }
      catch (err) {
        setError('Failed to fetch product');
        setLoading(false);
        console.error('Error fetching product:', err);
      }
    }
    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    // setValidationErrors({});


    try {
      // const validatedData = formData;
      console.log("error spot 1")
      await axios.delete(`${import.meta.env.VITE_API_URL}/products/${productId}`);
      console.log("error spot 2")
      showSuccess("Product deleted successfully");
      navigate("/product/list");
    }
    catch (err) {
      console.log("error spot 3")
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          if (issue.path.length > 0) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        });
        // setValidationErrors(fieldErrors);
        setSaving(false);
        return;
      }
      const axiosError = err as AxiosError<{
        type: string;
        fields: Record<string, string>;
        message: string;
      }>;

      if (axiosError.response?.status === 400 && axiosError.response?.data?.type === "ValidationFailed") {
        // setValidationErrors(axiosError.response.data.fields || {});
        setSaving(false);
        return;
      }

      showError("Failed to delete product");
      setSaving(false);
      console.error("Error deleting product:", err);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg">Loading product...</p>
      </div>
    );
  };

  if (error && !product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Delete Product</CardTitle>
          <CardDescription>Are you sure you want to delete {product.name}?</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardFooter className="flex gap-2">
            <Button type="submit" variant="destructive" disabled={saving}>
              {saving ? "Deleting..." : "Delete"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/product/list")}
              disabled={saving}
            >
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
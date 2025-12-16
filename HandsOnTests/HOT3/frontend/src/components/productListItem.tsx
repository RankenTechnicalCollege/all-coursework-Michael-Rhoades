import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";

const ProductListItem = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  const getDisplayName = () => {
    if (product.name && product.name.trim().length > 0) {
      return product.name;
    }
    else {
      return "Untitled Product";
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="font-medium text-lg"><a href={`/product/${product._id}/view`}>{getDisplayName()}</a></div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => navigate(`/product/${product._id}/edit`)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-sm text-gray-500">{product._id || "No ID"}</div>
      <div className="text-sm text-gray-500">{product.description || "No Description"}</div>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => navigate(`/product/${product._id}/delete`)}
      >
        Delete
      </Button>
    </div>
  )
}

export { ProductListItem };
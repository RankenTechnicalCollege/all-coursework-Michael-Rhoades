import { Button } from "@/components/ui/button";
import type { Bug } from "@/types/bug";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";

const BugListItem = ({ bug }: { bug: Bug }) => {
  const navigate = useNavigate();

  const getDisplayName = () => {
    if (bug.title && bug.title.trim().length > 0) {
      return bug.title;
    }
    else {
      return "Untitled Bug";
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="font-medium text-lg">{getDisplayName()}</div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => navigate(`/bugs/${bug._id}/edit`)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-sm text-gray-500">{bug._id || "No ID"}</div>
      <div className="text-sm text-gray-500">{bug.description || "No Description"}</div>
    </div>
  )
}

export { BugListItem };
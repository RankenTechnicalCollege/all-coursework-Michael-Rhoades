import type { Test } from "@/types/test";
import type { Bug } from "@/types/bug";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


const BugTestItem = ({ test, bug }: { test: Test, bug: Bug }) => {
  const getDisplayName = () => {
    if (test.title && test.title?.trim().length > 0) {
      return test.title;
    }
    else {
      return "Unnamed Test";
    }
  }
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="font-medium text-lg">{getDisplayName()}</div>
        </div>
        <div className="text-sm text-gray-500">{test.result || "No Result"}</div>
      </div>
      <div className="flex">
        <Button variant="outline" size="sm" onClick={() => navigate(`/bug/${bug._id}/test/${test.id}/edit`)}>Edit</Button>
        <Button variant="destructive" size="sm" onClick={() => navigate(`/bug/${bug._id}/test/${test.id}/delete`)}>Delete</Button>
      </div>
    </>
  )
}

export { BugTestItem };
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";

const UserListItem = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  const getDisplayName = () => {
    if (user.fullName && user.fullName.trim().length > 0) {
      return user.fullName;
    }
    else if (user.givenName && user.givenName.trim().length > 0 && user.familyName && user.familyName.trim().length > 0) {
      return `${user.givenName} ${user.familyName}`;
    }
    else if (user.givenName && user.givenName.trim().length > 0) {
      return user.givenName;
    }
    else if (user.email) {
      return user.email;
    }
    else {
      return "Anonymous";
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="font-medium text-lg"><a href={`/user/${user._id}/view`}>{getDisplayName()}</a></div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => navigate(`/user/${user._id}/edit`)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-sm text-gray-500">{user._id || "No ID"}</div>
      <div className="text-sm text-gray-500">{user.email || "No email"}</div>
      <div className="flex gap-2 flex-wrap">
        {user.role?.length ? (
          user.role.map((role, index) => (
            <Badge key={index} variant="secondary">
              {role}
            </Badge>
          ))
        ) : (
          <Badge variant="secondary">No role</Badge>
        )}
      </div>
    </div>
  )
}

export { UserListItem };
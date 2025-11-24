// import { ArrowRight } from "lucide-react";

// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface User {
  id: string;
  fullName: string;
  email: string;
  joined: string;
}

interface UserListProps {
  heading: string;
  users: User[];
}

const UserList = ({
  heading = "User List",
  users = [
    {
      id: "user-1",
      fullName: "Michael Rhoades",
      email:
        "michaeltrhoades42@gmail.com",
      joined: "11/21/2025",
    },
    {
      id: "user-1",
      fullName: "Michael Rhoades II",
      email:
        "michaeltrhoades421@gmail.com",
      joined: "11/22/2025",
    },
    {
      id: "user-1",
      fullName: "Michael Rhoades III",
      email:
        "michaeltrhoades422@gmail.com",
      joined: "11/23/2025",
    },
  ],
}: UserListProps) => {
  return (
    <section className="py-32">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            {heading}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {users.map((user) => (
            <Card
              key={user.id}
              className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0"
            >
              <CardHeader>
                <h3 className="text-lg font-semibold md:text-xl text-center">
                  <p>
                    {user.fullName}
                  </p>
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{user.email}</p>
                <p className="text-muted-foreground text-center">{user.joined}</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">Edit</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { UserList };

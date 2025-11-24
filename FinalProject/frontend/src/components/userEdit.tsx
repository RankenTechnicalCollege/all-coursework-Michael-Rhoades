// import { ArrowRight } from "lucide-react";

// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  role: string;
}

interface UserEditProps {
  heading: string;
  user: User;
}

const UserEdit = ({
  heading = "Edit User",
  user = 
    {
      id: "user-1",
      email: "michaeltrhoades42@gmail.com",
      password:
        "123456789",
      fullName: "Michael Rhoades",
      role: "admin",
    },
}: UserEditProps) => {
  return (
    <section className="py-32">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            {heading}
          </h2>
        </div>
        <div className="">
          <Card
            key={user.id}
            className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0"
          >
            <CardHeader>
              <Input
                type="string"
                placeholder={user.fullName}
                className="text-sm"
            />
            </CardHeader>
            <CardContent>
              <Input
                type="email"
                placeholder={user.email}
                className="text-sm"
            />
              <Input
                type="password"
                placeholder={user.password}
                className="text-sm"
            />
            <Input
                type="password"
                placeholder="Confirm password"
                className="text-sm"
            />
            <Input
                type="string"
                placeholder={user.role}
                className="text-sm"
            />
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">Submit</Button>
            </CardFooter>
          </Card>
          
        </div>
      </div>
    </section>
  );
};

export { UserEdit };

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

interface Bug {
  id: string;
  title: string;
  description: string;
  stepsToReproduce: string;
  classification: string;
  assignedToUserId: string;
}

interface BugEditProps {
  heading: string;
  bug: Bug;
}

const BugEdit = ({
  heading = "Edit Bug",
  bug = 
    {
      id: "bug-1",
      title: "example 1",
      description:
        "example bug number 1",
      stepsToReproduce: "exist",
      classification: "unclassified",
      assignedToUserId: "",
    },
}: BugEditProps) => {
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
            key={bug.id}
            className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0"
          >
            <CardHeader>
              <Input
                type="string"
                placeholder={bug.title}
                className="text-sm"
            />
            </CardHeader>
            <CardContent>
              <Input
                type="string"
                placeholder={bug.description}
                className="text-sm"
            />
              <Input
                type="string"
                placeholder={bug.stepsToReproduce}
                className="text-sm"
            />
            <Input
                type="string"
                placeholder={bug.classification}
                className="text-sm"
            />
            <Input
                type="string"
                placeholder={bug.assignedToUserId}
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

export { BugEdit };

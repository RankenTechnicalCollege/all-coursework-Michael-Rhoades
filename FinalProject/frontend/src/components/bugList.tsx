// import { ArrowRight } from "lucide-react";

// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface Bug {
  id: string;
  title: string;
  description: string;
  stepsToReproduce: string;
}

interface BugListProps {
  heading: string;
  bugs: Bug[];
}

const BugList = ({
  heading = "Bug List",
  bugs = [
    {
      id: "bug-1",
      title: "example 1",
      description:
        "example bug number 1",
      stepsToReproduce: "exist",
    },
    {
      id: "bug-2",
      title: "example 2",
      description:
        "example bug number 2",
      stepsToReproduce: "exist",
    },
    {
      id: "bug-3",
      title: "example 3",
      description:
        "example bug number 3",
      stepsToReproduce: "exist",
    },
  ],
}: BugListProps) => {
  return (
    <section className="py-32">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            {heading}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {bugs.map((bug) => (
            <Card
              key={bug.id}
              className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0"
            >
              <CardHeader>
                <h3 className="text-lg font-semibold md:text-xl text-center">
                  <p>
                    {bug.title}
                  </p>
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{bug.description}</p>
                <p className="text-muted-foreground text-center">{bug.stepsToReproduce}</p>
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

export { BugList };

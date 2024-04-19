import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const page = () => {
  return (
    <div className="max-w-md mx-auto">
      <Card className="flex flex-col">
        <CardContent className="py-8">
          <div>
            <h3 className=" inline-flex py-1 px-4 rounded-full text-sm font-semibold uppercase tracking-wide text-primary bg-primary/10">
              Monthly
            </h3>
          </div>

          <div className="mt-4 items-baseline text-6xl font-extrabold">
            $30<span className=" text-2xl ml-1 text-muted-foreground">/mo</span>
          </div>
          <p className="mt-5 text-lg text-muted-foreground">
            Write as many notes as you want for $30 a Month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;

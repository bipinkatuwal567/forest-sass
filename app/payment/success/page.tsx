import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const SuccessPage = () => {
  return (
    <div className="flex h-[80vh] justify-center items-center w-full">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
          </div>

          <div className="text-center mt-3 sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">
              Payment Successfull
            </h3>
            <p className="mt-2 text-muted-foreground text-sm">
              Congrats on your subscription, please check your email for further
              instructions.
            </p>
          </div>

          <div className="mt-5 sm:mt-6 w-full">
            <Button className="w-full" asChild>
              <Link href={"/"}>Go back to dashboard</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SuccessPage;

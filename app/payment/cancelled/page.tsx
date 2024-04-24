import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const CancelledPage = () => {
  return (
    <div className="flex h-[80vh] justify-center items-center w-full">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <XCircleIcon className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />
          </div>

          <div className="text-center mt-3 sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">Payment Failed</h3>
            <p className="mt-2 text-muted-foreground text-sm">
              No worries, you won&apos;t be charged. Please try again.
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

export default CancelledPage;

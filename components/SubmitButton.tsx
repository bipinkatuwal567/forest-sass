"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button className="w-fit" disabled={pending}>
          {" "}
          <Loader2 className="animate-spin  mr-2 w-4 h-4" /> Please wait
        </Button>
      ) : (
        <Button type="submit" className="w-fit">
          Save Now
        </Button>
      )}
    </>
  );
};

export default SubmitButton;

export const StripeSubscriptionButton = () => {
  const {pending} = useFormStatus();

  return (
    <>
      {pending ? (
        <Button className="w-full" disabled={pending}>
          {" "}
          <Loader2 className="animate-spin mr-2 w-4 h-4" /> Please wait
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          Buy Subscription
        </Button>
      )}
    </>
  );
}

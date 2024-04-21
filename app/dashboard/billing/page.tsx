import { StripePortal, StripeSubscriptionButton } from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";
import { getStripeSession, stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CheckCircle2 } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const featuredItems = [
  { name: "Lorem ipsum dolor sit amet." },
  { name: "Lorem ipsum dolor sit amet." },
  { name: "Lorem ipsum dolor sit amet." },
  { name: "Lorem ipsum dolor sit amet." },
  { name: "Lorem ipsum dolor sit amet." },
];

export async function getData(userId: string) {
  const data = await prisma.subscription.findUnique({
    where: { userId },
    select: {
      status: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });

  return data;
}

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  async function createCustomerPortal(){
    "use server";
    const session = await stripe.billingPortal.sessions.create({
      customer: data?.user?.stripeCustomerId as string,
      return_url: "http://localhost:3000/dashboard",
    })

    return redirect(session?.url);
  }

  if (data?.status === "active") {
    return (
      <div className="grid items-start gap-8">
        <div className="flex items-center justify-between px-4">
          <div className="grid gap-1">
            <h3 className="text-3xl md:text-4xl">Subscription</h3>
            <p className=" text-muted-foreground text-lg">
              Settings regarding your subscription.
            </p>
          </div>
        </div>

        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle>Edit Subscription</CardTitle>
            <CardDescription>Click on the button below, this will give you the opportunity to change your payment details and view your statement at the same time.</CardDescription>
          </CardHeader>

          <CardContent>
            <form action={createCustomerPortal}>
            <StripePortal />
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  async function createSubscription() {
    "use server";

    const dbUser = await prisma.user.findUnique({
      where: { id: user?.id },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!dbUser?.stripeCustomerId) {
      throw new Error("Unable to get customer id");
    }

    const subscriptionURL = await getStripeSession({
      customerId: dbUser.stripeCustomerId,
      domainUrl: "http://localhost:3000",
      priceId: process.env.STRIPE_PRICE_ID as string,
    });

    return redirect(subscriptionURL);
  }

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

          <div className=" flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-10">
            <ul className="space-y-4">
              {featuredItems.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                  <p className="text-base">{item.name}</p>
                </li>
              ))}
            </ul>
            <form action={createSubscription}>
              <StripeSubscriptionButton />
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;

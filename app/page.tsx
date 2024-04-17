import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();

  if (await isAuthenticated()) {
    return redirect("/dashboard");
  }

  return (
    <main className="h-[90vh] flex items-center justify-center bg-background">
      <div className="relative items-cemter w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <span className="w-auto px-6 py-3 rounded-full bg-secondary">
              <span className="text-sm font-medium text-primary">
                Sort your notes easily
              </span>
            </span>

            <h1 className="mt-8 text-3xl font-extrabold lg:text-6xl tracking-tight">
              Create notes with ease
            </h1>
            <p className="mt-8 max-w-xl mx-auto text-primary-foreground text-base lg:text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              dolores consequatur ipsum.
            </p>
          </div>

          <div className="flex justify-center max-w-sm mx-auto mt-10">
            <Button size={"lg"} className="w-full">
              <RegisterLink>Sign up for free</RegisterLink>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

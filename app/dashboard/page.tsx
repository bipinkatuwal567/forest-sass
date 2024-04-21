import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { File } from "lucide-react";
import Link from "next/link";

export async function getNotes(userId: string) {
  const data = await prisma.note.findMany({
    where: { id: userId },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await getNotes(user?.id as string);

  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h3 className="text-3xl md:text-4xl">Your Notes</h3>
          <p className="text-lg text-muted-foreground">
            Here you can see and create new notes
          </p>
        </div>
        <Button asChild>
          <Link href={"/dashboard/new"}>Create a new note</Link>
        </Button>
      </div>

      {data.length > 0 ? (
        <div>Hello</div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] rounded-md border border-dashed text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <File className="h-10 w-10 text-primary" />
          </div>

          <h3 className="mt-6 text-xl font-semibold">
            You don't have nay notes created
          </h3>
          <p className="text-sm mb-8 mt-2 text-center leading-6 text-muted-foreground max-w-sm mx-auto">
            You currently don't have any notes. Please create some so that you
            can see them right here.
          </p>
          <Button asChild>
            <Link href={"/dashboard/new"}>Create a new note</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

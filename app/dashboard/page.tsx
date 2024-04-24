import { DeleteBtn } from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Edit, File } from "lucide-react";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

export async function getNotes(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      Notes: true,
      Subscription: {
        select: {
          status: true,
        },
      },
    },
  });

  return data;
}

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log(user?.id);

  const data = await getNotes(user?.id as string);

  async function deleteData(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.note.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard");
  }

  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h3 className="text-3xl md:text-4xl">Your Notes</h3>
          <p className="text-lg text-muted-foreground">
            Here you can see and create new notes
          </p>
        </div>
        {data?.Subscription?.status === "active" ? (
          <Button asChild>
            <Link href={"/dashboard/new"}>Create a new note</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href={"/dashboard/billing"}>Create a new note</Link>
          </Button>
        )}
      </div>

      {data?.Notes.length == 0 ? (
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
          {data?.Subscription?.status === "active" ? (
            <Button asChild>
              <Link href={"/dashboard/new"}>Create a new note</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href={"/dashboard/billing"}>Create a new note</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {data?.Notes.map((item, index) => (
            <Card key={index} className="flex items-center justify-between p-4">
              <div>
                <h2 className="text-xl font-semibold text-primary">
                  {item.title}
                </h2>
                <p>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "full",
                  }).format(item.createdAt)}
                </p>
              </div>

              <div className="flex gap-x-4">
                <Button variant={"outline"} size={"icon"} asChild>
                  <Link href={`/dashboard/new/${item.id}`}>
                    <Edit className="w-4 h-4" />
                  </Link>
                </Button>

                <form action={deleteData}>
                  <Input type="hidden" name="id" value={item.id} />
                  <DeleteBtn />
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

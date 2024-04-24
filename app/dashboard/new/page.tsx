import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function postData(formData: FormData) {
  "use server";
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  await prisma.note.create({
    data: {
      userId: user?.id,
      title,
      description,
    },
  });
  return redirect("/dashboard");
}

export default async function NewNotePage() {
  return (
    <Card>
      <form action={postData}>
        <CardHeader>
          <CardTitle>New Note</CardTitle>
          <CardDescription>
            Right here you can create your new note.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input
              required
              type="text"
              name="title"
              placeholder="Title for you note..."
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              required
              name="description"
              placeholder="Describe you note here..."
            />
          </div>
        </CardContent>

        <CardFooter>
          <div className="w-full flex justify-between">
            <Button variant={"outline"} asChild>
              <Link href={"/dashboard"}>Cancel</Link>
            </Button>
            <SubmitButton />
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

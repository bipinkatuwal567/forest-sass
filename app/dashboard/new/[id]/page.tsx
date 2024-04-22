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

async function getNote({ noteId, userId }: { noteId: string; userId: string }) {
  const data = await prisma.note.findUnique({
    where: {
      id: noteId,
      userId: userId,
    },
    select: {
      title: true,
      description: true,
      id: true,
    },
  });

  return data;
}

export default async function IdPage({ params }: { params: { id: string } }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const note = await getNote({ noteId: params.id, userId: user?.id as string });

  

  return (
    <Card>
      <form>
        <CardHeader>
          <CardTitle>Edit Note</CardTitle>
          <CardDescription>
            Right here you can edit your new note.
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
              defaultValue={note?.title}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              required
              name="description"
              placeholder="Describe you note here..."
              defaultValue={note?.description}
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

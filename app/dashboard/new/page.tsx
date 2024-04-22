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
import Link from "next/link";

async function postData(formData: FormData){
    'use server';
    const title = formData.get("title");
    const description = formData.get("description");

    console.log(title, description);
    
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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <div className="grid items-start gap-8">
      <div className="flex justify-between items-center px-2">
        <div className="grid gap-1">
          <h2 className="text-3xl md:text-4xl font-medium">Settings</h2>
          <p className="text-muted-foreground text-lg">Your profile setting</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Data</CardTitle>
          <CardDescription>
            Please provide general information about yourself. Please don't
            forget to save.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="space-y-4">
              <div className="space-y-1">
                <Label>Your Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  id="name"
                />
              </div>
              <div className="space-y-1">
                <Label>Your Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  id="email"
                />
              </div>
              <div className="space-y-1">
                <Label>Color Scheme</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Colors</SelectLabel>
                      <SelectItem value="theme-orange">Orange</SelectItem>
                      <SelectItem value="theme-blue">Blue</SelectItem>
                      <SelectItem value="theme-violet">Violet</SelectItem>
                      <SelectItem value="theme-yellow">Yellow</SelectItem>
                      <SelectItem value="theme-green">Green</SelectItem>
                      <SelectItem value="theme-red">Red</SelectItem>
                      <SelectItem value="theme-rose">Rose</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

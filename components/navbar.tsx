import Link from "next/link";
import { ThemeToggler } from "./theme-toggler";
import { Button } from "./ui/button";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = async () => {
  const { isAuthenticated } = getKindeServerSession();

  return (
    <nav className=" w-full flex items-center h-[10vh] bg-background border-b">
      <div className="container flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="text-3xl font-bold">ForestSass</h1>
        </Link>

        <div className="flex items-center gap-x-5">
          <ThemeToggler />
          {(await isAuthenticated()) ? (
            <LogoutLink>
              <Button>Log out</Button>
            </LogoutLink>
          ) : (
            <>
              <Button>
                <LoginLink>Sign in</LoginLink>
              </Button>
              <Button variant={"secondary"}>
                <RegisterLink>Sign up</RegisterLink>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

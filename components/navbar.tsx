import Link from "next/link";
import { ThemeToggler } from "./theme-toggler";
import { Button } from "./ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserNav from "./user-nav";

const Navbar = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className=" w-full flex items-center h-[10vh] bg-background border-b">
      <div className="container flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="text-xl sm:text-3xl font-bold">
            Forest <span className="text-primary">Sass</span>
          </h1>
        </Link>

        <div className="flex items-center gap-x-2 sm:gap-x-5">
          <ThemeToggler />
          {(await isAuthenticated()) ? (
            <UserNav user={user} />
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

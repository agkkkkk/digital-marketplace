"use client";
import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const DotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};

export function Navbar() {
  return (
    <nav className="relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7">
      <div className="md:col-span-3">
        <Link href="/">
          <h1 className="text-2xl font-bold">
            Digital<span className="text-primary">Haven</span>
          </h1>
        </Link>
      </div>
      <NavbarLinks />
      <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Link
                label="Sell your Product"
                labelIcon={<DotIcon />}
                href="/sell"
              />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}

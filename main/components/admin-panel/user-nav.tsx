"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LayoutGrid, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import googleIcon from "@/public/google-icon.svg";
import { getInitials } from "@/lib/utils";

export function UserNav({ className }: { className?: string }) {
  const { data: session, status } = useSession();
  // console.log(session, status);
  return (
    <>
      {status == "authenticated" && (
        <DropdownMenu>
          <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={`relative h-8 w-8 rounded-full ${className}`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="#" alt="Avatar" />
                      <AvatarFallback className="bg-transparent">
                        {getInitials(session.user?.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom">Profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session.user?.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:cursor-pointer" asChild>
                <Link href="/dashboard" className="flex items-center">
                  <LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer" asChild>
                <Link href="/account" className="flex items-center">
                  <User className="w-4 h-4 mr-3 text-muted-foreground" />
                  Account
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => signOut()}
            >
              <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {status !== "authenticated" && (
        <Button
          variant="outline"
          className="relative"
          // onClick={(e) => {
          //   e.preventDefault;
          //   signIn("google")
          // }}
          onClick={(e) => signIn("google")}
        >
          Sign In
          <Image
            priority
            src={googleIcon}
            alt="Sign In"
            // height={15}
            // width={15}
            className="pl-2 w-7 aspect-square"
          />
        </Button>
      )}
    </>
  );
}

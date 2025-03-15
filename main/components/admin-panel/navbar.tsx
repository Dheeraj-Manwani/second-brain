"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import useModal from "@/hooks/useModal";
import Link from "next/link";
import { getUpdatedUrl, searchParamsToObject } from "@/lib/utils";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { ModalType, useModalState } from "@/store/modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  const openModal = useModalState((state) => state.openModal);
  const params = useParams();
  console.log("Inside navbar params :::::::::::::::: ", params);
  return (
    // <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
    <header className="sticky top-0 z-10 w-full bg-[--white] shadow  dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold text-[--dark-yellow]">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end">
          {/* <Link
            // href={""}
            href={getUpdatedUrl("/dashboard", searchParamObject, {
              newResource: "open",
            })}
          > */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"default"}
                className="bg-light-cream text-dark-yellow  mr-2"
                // onClick={() => {
                // onOpen();
                // setIsModalOpen(true);
                // openModal();
                //   console.log("onpend modal");
                // }}
              >
                <Plus />
                New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    // onOpen();
                    // setIsModalOpen(true);
                    openModal(ModalType.NEW_RESOURCE);
                    console.log("onpend modal");
                  }}
                >
                  Resource
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    // onOpen();
                    // setIsModalOpen(true);
                    openModal(ModalType.NEW_RESOURCE_GROUP);
                    console.log("onpend modal");
                  }}
                >
                  Resource Group
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* </Link> */}
          <ModeToggle className="mr-2" />
          <UserNav />
        </div>
      </div>
    </header>
  );
}

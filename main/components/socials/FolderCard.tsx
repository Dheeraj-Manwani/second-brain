"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Instagram, Twitter, X, Youtube } from "lucide-react";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ResourceDropdown } from "./SocialCardDropdown";
import instagramLogo from "@/public/instagram-logo.svg";
import xLogo from "@/public/x-logo.svg";
import youtubeLogo from "@/public/youtube-logo.svg";
import resourceCover from "@/public/resource-cover.svg";
import defaultFolderCover from "@/public/default-folder.jpeg";
import { ResourceType, ResourceTypeEnumType } from "@/actions/resource/schema";
import { useRouter } from "nextjs-toploader/app";
import { ResourceGroupType } from "@/actions/resourceGroup/schema";

export function FolderCard({
  resourceGroup,
}: {
  resourceGroup: ResourceGroupType;
}) {
  const router = useRouter();
  return (
    <Card
      className="w-[250px] h-min rounded-xl mr-3 mt-3"
      key={resourceGroup.id}
    >
      <CardHeader
        className="rounded-md p-3 flex justify-center items-center h-[151px] cursor-pointer"
        onClick={() => router.push(`/resources/${resourceGroup.slug}`)}
      >
        <Image
          className={"object-cover rounded-md h-[127px] w-full"}
          width={50}
          height={50}
          quality={100}
          src={resourceGroup.coverUrl || ""}
          alt="Folder Cover Image"
        />
      </CardHeader>
      <CardContent className="p-3 pt-0 pb-0 flex justify-between">
        <Tooltip>
          <TooltipTrigger>
            <CardTitle className="text-left">
              {resourceGroup.title.length > 50
                ? resourceGroup.title.substring(0, 50) + "..."
                : resourceGroup.title}
            </CardTitle>
          </TooltipTrigger>
          {resourceGroup.title.length > 50 && (
            <TooltipContent>
              <p className="w-52 text-wrap">{resourceGroup.title}</p>
            </TooltipContent>
          )}
        </Tooltip>
        {/* <ResourceDropdown /> */}
      </CardContent>
      <CardFooter className="flex justify-between p-3 pt-0">
        <CardDescription>
          <div className="flex justify-center align-middle gap-1">
            Resource Group
          </div>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

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
import { Eye, EyeOff, Instagram, Twitter, X, Youtube } from "lucide-react";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ResourceDropdown } from "./SocialCardDropdown";
import instagramLogo from "@/public/instagram-logo.svg";
import xLogo from "@/public/x-logo.svg";
import youtubeLogo from "@/public/youtube-logo.svg";
import resourceCover from "@/public/resource-cover.svg";
import { ResourceType, ResourceTypeEnumType } from "@/actions/resource/schema";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TailSpin } from "react-loader-spinner";
import { useAction } from "@/hooks/useAction";
import { VisibilityType } from "@/actions/types";
import { boolean } from "zod";
import { toast } from "sonner";
import { changeResourceVisibility } from "@/actions/resource";
import { twJoin, twMerge } from "tailwind-merge";
import { useResources } from "@/store/resources";

export const getResourceTypeLabel = (
  type: ResourceTypeEnumType | null | undefined,
  logoStyles: string | undefined = ""
) => {
  switch (type) {
    case "INSTAGRAM_POST":
    case "INSTAGRAM_REEL":
      return (
        <>
          <Instagram className={logoStyles} />
          <span>Instagram</span>
        </>
      );

    case "TWITTER_POST":
      return (
        <>
          <Twitter className={logoStyles} />
          <span>X (Twitter)</span>
        </>
      );

    case "YOUTUBE_VIDEO":
      return (
        <>
          <Youtube className={logoStyles} />
          <span>Youtube</span>
        </>
      );

    default:
      return "Unknown";
  }
};

export const getCoverImage = (
  type: ResourceTypeEnumType | null | undefined,
  url: string | undefined | null
): string => {
  if (url) return url;

  switch (type) {
    case "INSTAGRAM_POST":
    case "INSTAGRAM_REEL":
      return instagramLogo;
    case "TWITTER_POST":
      return xLogo;
    case "YOUTUBE_VIDEO":
      return youtubeLogo;
    default:
      return resourceCover;
  }
};

export function SocialCard({ resource }: { resource: ResourceType }) {
  const router = useRouter();
  const setResources = useResources((state) => state.setResources);
  const resources = useResources((state) => state.resources);
  const { resourceGroupSlug }: { resourceGroupSlug: string } = useParams();
  // const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleChangeResourceVisibility = async (
    resourceId: string,
    visibility: VisibilityType
  ) => {
    const res = await execute({ resourceId, visibility });

    if (res?.success) {
      const currResource = resources.find((r) => r.id === resourceId);
      if (!currResource) return;
      currResource.visibility = visibility;
      const newResources = [...resources, currResource];
      setResources(newResources);
    }
  };

  const { isLoading, execute } = useAction(changeResourceVisibility, {
    toastMessages: {
      loading: "Changing resource visibility...",
      error: "Something went wrong",
      success: "Visibility changed successfully!",
    },
  });

  const getCurrentResourceVisibilityFromState = (): VisibilityType => {
    const currentResource = resources.find((r) => r.id === resource.id);
    return currentResource ? currentResource.visibility : resource.visibility;
  };
  return (
    <Card
      className={twMerge("w-[250px] h-min rounded-xl mr-3 mt-3 relative")}
      key={resource.id}
    >
      {isLoading && (
        <div className="absolute flex justify-center items-center top-0 left-0 w-full h-full rounded-xl text-white bg-black/20 z-20 pb-10">
          <TailSpin color="white" height={40} width={40} strokeWidth={3} />
        </div>
      )}
      <CardHeader
        className="rounded-md p-3 flex justify-center items-center h-[151px]  cursor-pointer"
        onClick={() =>
          router.push(`/resources/${resourceGroupSlug}/${resource.id}`)
        }
      >
        <Tooltip>
          <TooltipTrigger>
            <Button
              className="absolute translate-x-[5.2rem] translate-y-3 tray z-10 p-0"
              size="superMiniIcon"
              variant={"outline"}
              onClick={(e) => e.stopPropagation()}
            >
              {getCurrentResourceVisibilityFromState() === "PUBLIC" ? (
                <Eye
                  size={25}
                  className="text-black dark:text-white"
                  strokeWidth={2}
                />
              ) : (
                <EyeOff
                  size={25}
                  className="text-black dark:text-white"
                  strokeWidth={2}
                />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="translate-x-[5.2rem] translate-y-3">
            {resource.visibility === "PUBLIC"
              ? "Public Resource"
              : "Private Resource"}
          </TooltipContent>
        </Tooltip>
        <Image
          className={`object-cover rounded-md ${
            resource.resourceStorage?.s3Url
              ? "h-[127px] w-full"
              : "h-[60px] w-[60px]"
          }`}
          width={50}
          height={50}
          quality={100}
          src={getCoverImage(resource.type, resource.resourceStorage?.s3Url)}
          alt="Resource Cover Image"
        />
        {/* <Image
          priority
          src={xIcon}
          alt="Sign In"
          // height={15}
          // width={15}
          className="w-1/2 object-cover rounded-md h-[127px]"
        /> */}
      </CardHeader>
      <CardContent className="p-3 pt-0 pb-0 flex justify-between">
        <Tooltip>
          {resource.title.length > 30 ? (
            <>
              <TooltipTrigger className="cursor-default">
                <CardTitle className="text-left">
                  {resource.title.substring(0, 30) + "..."}
                </CardTitle>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-52 text-wrap">{resource.title}</p>
              </TooltipContent>
            </>
          ) : (
            <CardTitle className="text-left">{resource.title}</CardTitle>
          )}
        </Tooltip>
        <ResourceDropdown
          resource={resource}
          resourceGroupSlug={resourceGroupSlug}
          changeVisibility={handleChangeResourceVisibility}
        />
      </CardContent>
      <CardFooter className="flex justify-between p-3 pt-0">
        <CardDescription>
          <div className="flex justify-center align-middle gap-1">
            {getResourceTypeLabel(
              resource.type,
              "w-[0.9rem] h-[0.9rem] pt-[0.1rem] mt-0.5"
            )}
          </div>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

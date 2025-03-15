import { QueryParams } from "@/actions/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SafeParseReturnType, z, ZodType } from "zod";
import { FieldErrors } from "./create-safe-action";
import {
  ResourceTypeEnum,
  ResourceTypeEnumType,
} from "@/actions/resource/schema";
import { ResourceGroupType } from "@/actions/resourceGroup/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUpdatedUrl = (
  path: string,
  prevQueryParams: QueryParams,
  newQueryParams: QueryParams
) => {
  const updatedQuery = { ...prevQueryParams, ...newQueryParams };
  const queryString = new URLSearchParams(
    updatedQuery as Record<string, string>
  ).toString();
  return `${path}?${queryString}`;
};

export const searchParamsToObject = (
  searchParams: URLSearchParams
): Record<string, string | string[]> => {
  const obj: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    obj[key] = value;
  });
  // console.log(searchParams);
  return obj;
};

export const getInitials = (name: string | null | undefined) => {
  if (!name) return "U";
  let words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0][0]?.toUpperCase() || "U";
  }
  return (
    (words[0][0] || "") + (words[words.length - 1][0] || "")
  ).toUpperCase();
};

export const isValidURL = (str: string) => {
  try {
    new URL(str);
    return true;
  } catch (e) {
    return false;
  }
};

export const messagesEnum = {
  UNAUTHORISED: "You are unauthorised, please sign in to continue.",
};

export const getResourceType = (url: string): ResourceTypeEnumType => {
  if (
    (url.includes("youtube.com") || url.includes("youtu.be")) &&
    !url.includes("posts")
  ) {
    return "YOUTUBE_VIDEO";
  }
  if (url.includes("instagram.com/reel")) {
    return "INSTAGRAM_REEL";
  }
  if (url.includes("instagram.com/p")) {
    return "INSTAGRAM_POST";
  }
  if (url.includes("x.com")) {
    return "TWITTER_POST";
  }
  return "UNSUPPORTED";
};

export const getApplicatinoName = (resourceType: ResourceTypeEnumType) => {
  switch (resourceType) {
    case "INSTAGRAM_POST":
    case "INSTAGRAM_REEL":
      return "Instagram";
    case "YOUTUBE_VIDEO":
      return "Youtube";
    case "TWITTER_POST":
      return "X";
    case "UNSUPPORTED":
      return "App";
    default:
      return "App";
  }
};

export const getResourceGroupOptions = (
  resourceGroups: ResourceGroupType[]
) => {
  const resourceGroupOptions = resourceGroups.map((rg) => {
    return { label: rg.title, value: rg.id, type: rg.type };
  });
  return resourceGroupOptions.sort((a, b) =>
    a.type === "DEFAULT" ? -1 : b.type === "DEFAULT" ? 1 : 0
  );
};

export const visibilityDropdownOptions = [
  { label: "Public ", value: "PUBLIC" },
  { label: "Private", value: "PRIVATE" },
];

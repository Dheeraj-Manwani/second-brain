"use client";

import { getResourceById } from "@/actions/resource";
import { Instagram } from "lucide-react";
import { SocialEmbed } from "../socials/SocialEmbed";
import ReadMore from "../ui/Readmore";
import { getResourceTypeLabel } from "../socials/SocialCard";
import { ResourceType, ResourceTypeEnum } from "@/actions/resource/schema";
import { twMerge } from "tailwind-merge";
import { ResourceTypeSchema } from "@prisma/client";
import { useState } from "react";
import { v4 as uuid } from "uuid";
// import { InstagramEmbed } from "react-social-media-embed";

export default function ViewResource({
  resource,
  embedKey,
}: {
  resource: ResourceType;
  embedKey: string;
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between">
      {/* {resource && ( */}
      <div
        className={twMerge(
          "pl-5 pt-2",
          resource.type !== ResourceTypeSchema.YOUTUBE_VIDEO && "w-1/2"
        )}
      >
        <h2 className="text-2xl font-extrabold dark:text-white">
          {resource?.title}
        </h2>
        {/* <div className="flex justify-start items-center">
            <Instagram className="w-[1rem] h-[1rem] pt-[0.1rem]" />
            <span className="ml-1">Instagram</span>
          </div> */}
        <div className="flex items-center gap-1 text-slate-500">
          {getResourceTypeLabel(resource.type, "w-[1rem] h-[1rem]")}
        </div>
        <p className="my-4 text-lg text-gray-500">
          <ReadMore text={resource?.description} maxLength={150} />
        </p>
      </div>
      <div
        className={twMerge(
          "flex justify-center items-start pt-2",
          resource.type !== ResourceTypeSchema.YOUTUBE_VIDEO ? "w-1/2" : "p-3"
        )}
      >
        <SocialEmbed
          url={resource?.url}
          type={resource.type}
          coverImageUrl={resource.resourceStorage?.s3Url}
          key={embedKey}
        />
      </div>

      {/* )} */}
    </div>
  );
}

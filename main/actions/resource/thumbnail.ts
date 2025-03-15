"use server";

import { JSDOM } from "jsdom";
import { getResourceType } from "@/lib/utils";
import axios, { AxiosResponse } from "axios";
import { storeFileInS3 } from "../s3";
import { ResourceTypeSchema } from "@prisma/client";
import { ResourceTypeEnumType } from "./schema";
import { generateImage } from "..";

export const generateThumbnail = async (url: string) => {
  const thumbnailTitle = await getResourceTitleFromUrl(url);
  if (!thumbnailTitle) return;

  // const thumbnail: AxiosResponse = await axios.get(
  //   `${process.env.IMAGE_GENERATION_API}/${
  //     process.env.IMAGE_GENERATION_PROMPT_2
  //   }${encodeURIComponent(thumbnailTitle)}`,
  //   { responseType: "arraybuffer" }
  // );

  // const buffer = Buffer.from(thumbnail.data, "binary");

  const buffer = await generateImage(
    process.env.NEW_IMAGE_GENERATION_PROMPT,
    thumbnailTitle
  );

  const resourceKey = await storeFileInS3(buffer);

  return resourceKey;
};

const getResourceTitleFromUrl = async (
  url: string
): Promise<string | null | undefined> => {
  const type: ResourceTypeEnumType = getResourceType(url);
  if (type === "UNSUPPORTED" || type === "TWITTER_POST") return;

  const content = await axios.get(url);
  switch (type) {
    case ResourceTypeSchema.INSTAGRAM_REEL:
    case ResourceTypeSchema.INSTAGRAM_POST:
      return getTitleForInstagram(content.data);
    case ResourceTypeSchema.YOUTUBE_VIDEO:
      return getTitleForYoutube(content.data);

    default:
      return;
  }
};

const getTitleForYoutube = (content: string): string | null | undefined => {
  const dom = new JSDOM(content);
  const doc = dom.window.document;

  const title = doc.querySelector("title")?.textContent;
  // console.log("Title:", title);

  return title;
};

const getTitleForInstagram = (content: string): string | null | undefined => {
  const dom = new JSDOM(content);
  const doc = dom.window.document;

  const description = doc
    .querySelector('meta[name="description"]')
    ?.getAttribute("content");

  return description;
};

"use server";

import db from "@/db";
import { messagesEnum } from "./../../lib/utils";

import { ActionState, createSafeAction } from "@/lib/create-safe-action";
import {
  ResourceGroupInput,
  ResourceGroupInputType,
  ResourceGroupType,
  ReturnTypeCreateResourceGroup,
} from "./schema";
import { getServerSession } from "next-auth";
import { authConfig, session } from "@/lib/auth";
import { generateImage } from "..";
import { storeFileInS3 } from "../s3";
import { v4 as uuid } from "uuid";

async function generateUniqueSlug(title: string): Promise<string> {
  try {
    let slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    let uniqueSlug = slug;
    let count = 1;

    while (1) {
      console.log("Trying for slug ", uniqueSlug);
      const slugRecords = await db.resourceGroup.findFirst({
        select: { id: true },
        where: { slug: uniqueSlug },
      });

      console.log("slugRecords  ", slugRecords);
      if (!slugRecords || !slugRecords.id) break;

      uniqueSlug = `${slug}-${count}`;
      count++;
    }
    // const uniqueSlug = `${slug}-${uuid()}`;
    return uniqueSlug;
  } catch (e) {
    console.log("Error occured while creating slug", e);
    return "error occured while creating slug";
  }
}

async function getOrder() {
  const highestOrder = await db.resourceGroup.findFirst({
    select: {
      order: true,
    },
    orderBy: { order: "desc" },
  });
  console.log("highestOrder", highestOrder);
  if (
    !highestOrder ||
    highestOrder.order === null ||
    highestOrder.order === undefined
  )
    return 0;

  return highestOrder.order + 1;
}

const createResourceGroupHandler = async (
  resourceGroup: ResourceGroupInputType
): Promise<ReturnTypeCreateResourceGroup> => {
  // @ts-ignore
  const session: session | null = await getServerSession(authConfig);

  console.log(
    "inside create resource group handler :::::::::::: ",
    resourceGroup
  );

  if (!session || !session?.user?.id) {
    return { error: messagesEnum.UNAUTHORISED };
  }
  try {
    const buffer = await generateImage(
      process.env.NEW_FOLDER_COVER_GENERATION_PROMPT,
      resourceGroup.title
    );

    const s3Key = await storeFileInS3(buffer);

    const order = await getOrder();
    const slug = await generateUniqueSlug(resourceGroup.title);
    // const order = 0;

    console.log("data ====> ", {
      userId: session.user.id,
      title: resourceGroup.title,
      coverUrl: `${process.env.CLOUDFRONT_URL}/${s3Key}.jpeg`,
      slug,
      type: "CUSTOM",
      order,
    });
    // @ts-ignore
    // return;
    const res = await db.resourceGroup.create({
      data: {
        userId: session.user.id,
        title: resourceGroup.title,
        coverUrl: `${process.env.CLOUDFRONT_URL}/${s3Key}.jpeg`,
        slug,
        type: "CUSTOM",
        order,
        visibility: "PRIVATE",
      },
    });
    return { data: res };
  } catch (e) {
    console.log("error occured while creating resource ::: ", e);
    return { error: "Failed to create resource" };
  }
};

export const getResourceGroups = async (
  userId: string
): Promise<ActionState<ResourceGroupInputType, ResourceGroupType[]>> => {
  const resourceGroups = await db.resourceGroup.findMany({
    select: {
      id: true,
      userId: true,
      title: true,
      type: true,
      slug: true,
      order: true,
      coverUrl: true,
      visibility: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      userId,
    },
  });

  return { data: resourceGroups };
};

export const getResourceGroupsForSelect = async (filter?: string) => {
  // @ts-ignore
  const session: session | null = await getServerSession(authConfig);

  if (!session || !session?.user?.id) {
    return [];
  }

  const resourceGroups = await db.resourceGroup.findMany({
    select: {
      id: true,
      title: true,
    },
    where: {
      userId: session.user.id,
      ...(filter && {
        title: {
          contains: filter,
          mode: "insensitive",
        },
      }),
    },
  });

  return resourceGroups.map((grp) => {
    return { label: grp.title, value: grp.id };
  });
};

export const createResourceGroup = createSafeAction(
  ResourceGroupInput,
  createResourceGroupHandler
);

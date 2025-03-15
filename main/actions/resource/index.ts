"use server";

import { ActionState, createSafeAction } from "@/lib/create-safe-action";
import {
  ResourceInput,
  ResourceInputType,
  ResourceSchema,
  ReturnTypeCreateResource,
} from "./schema";
import db from "@/db";
import { getServerSession } from "next-auth";
import { authConfig, session } from "@/lib/auth";
import { getResourceType, messagesEnum } from "@/lib/utils";
import { ResourceType } from "@/actions/resource/schema";
import { generateThumbnail } from "./thumbnail";
import { ResourceGroupType } from "../resourceGroup/schema";
import { VisibilityType } from "../types";
import { error } from "console";

async function getOrder() {
  const highestOrder = await db.resource.findFirst({
    select: {
      order: true,
    },
    orderBy: { order: "desc" },
  });

  if (!highestOrder || !highestOrder.order) return 0;

  return highestOrder.order + 1;
}

const createResourceHandler = async (
  resource: ResourceInputType
): Promise<ReturnTypeCreateResource> => {
  // @ts-ignore
  const session: session | null = await getServerSession(authConfig);

  if (!session || !session?.user?.id) {
    return { error: messagesEnum.UNAUTHORISED };
  }

  try {
    const s3Key: string | undefined = await generateThumbnail(resource.url);

    const order = await getOrder();
    const res = await db.resource.create({
      data: {
        title: resource.title,
        url: resource.url,
        description: resource.description,
        type: getResourceType(resource.url),
        userId: session.user.id,
        resourceGroupId: resource.resourceGroupId,
        order,
        visibility: "PRIVATE",
        metadata: {},
        ...(s3Key && {
          resourceStorage: {
            create: {
              s3Url: `${process.env.CLOUDFRONT_URL}/${s3Key}.jpeg`,
              id: s3Key,
            },
          },
        }),
      },
    });

    return { data: res };
  } catch (e) {
    console.log("error occured while creating resource ::: ", e);
    return { error: "Failed to create resource" };
  }
};

// TODO: Add Pagination
export const getResources = async (
  userId: string,
  resourceGroupSlug: string
): Promise<ActionState<ResourceInputType, ResourceType[]>> => {
  // @ts-ignore
  // const session: session | null = await getServerSession(authConfig);
  // console.log(session);

  // if (!session || !session?.user?.id) {
  // return { error: messagesEnum.UNAUTHORISED };
  // }

  const resources = await db.resource.findMany({
    select: {
      id: true,
      type: true,
      title: true,
      order: true,
      url: true,
      resourceGroupId: true,
      description: true,
      metadata: true,
      visibility: true,
      createdAt: true,
      updatedAt: true,
      resourceStorage: {
        select: {
          s3Url: true,
        },
      },
    },
    where: {
      userId,
      resourceGroup: {
        slug: resourceGroupSlug,
      },
    },
  });

  // const resourceGroups = await db.resourceGroup.findMany({
  //   select: {
  //     id: true,
  //     title: true,
  //     order: true,
  //     parentResourceGroupId: true,
  //     coverUrl: true,
  //     userId: true,
  //     createdAt: true,
  //     updatedAt: true,
  //   },
  //   where: {
  //     userId,
  //     parentResourceGroupId: null,
  //   },
  // });

  // const mergedResources = mergeResources(resources, resourceGroups);

  return { data: resources };
};

export const getResourceById = async (
  // userId: string,
  resourceId: string
): Promise<ActionState<string, ResourceType>> => {
  // @ts-ignore
  // const session: session | null = await getServerSession(authConfig);
  // console.log(session);

  // if (!session || !session?.user?.id) {
  // return { error: messagesEnum.UNAUTHORISED };
  // }

  const resource = await db.resource.findFirst({
    select: {
      id: true,
      type: true,
      title: true,
      url: true,
      order: true,
      description: true,
      resourceGroupId: true,
      metadata: true,
      visibility: true,
      createdAt: true,
      updatedAt: true,
      resourceStorage: {
        select: {
          s3Url: true,
        },
      },
    },
    where: {
      // userId,
      id: resourceId,
    },
  });

  return { data: resource! };
};

export const changeResourceVisibility = async ({
  resourceId,
  visibility,
}: {
  resourceId: string;
  visibility: VisibilityType;
}): Promise<
  ActionState<
    {
      resourceId: string;
      visibility: VisibilityType;
    },
    ResourceType
  >
> => {
  // @ts-ignore
  const session: session | null = await getServerSession(authConfig);

  if (!session || !session?.user?.id) {
    return { error: messagesEnum.UNAUTHORISED };
  }

  try {
    const data = await db.resource.update({
      data: { visibility },
      where: { id: resourceId, userId: session.user.id },
    });

    return { data };
  } catch (e) {
    console.log(e);
    return {
      error: "Error occured while changing resource visibility",
    };
  }
};

export const createResource = createSafeAction(
  ResourceInput,
  createResourceHandler
);

import { ActionState } from "@/lib/create-safe-action";
import { z } from "zod";
import { VisibilityEnum } from "../types";

export const ResourceGroupInput = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(250, "Title can take upto a max of 250 characters."),
});

export type ResourceGroupInputType = z.infer<typeof ResourceGroupInput>;

export const ResourceGroupTypeEnum = z.enum(["DEFAULT", "CUSTOM"]);
export type ResourceGroupTypeEnumType = z.infer<typeof ResourceGroupTypeEnum>;

export const ResourceGroupSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  title: z.string(),
  slug: z.string(),
  type: ResourceGroupTypeEnum,
  order: z.number(),
  visibility: VisibilityEnum,
  coverUrl: z.string().optional().nullable(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date(),
});

export type ResourceGroupType = z.infer<typeof ResourceGroupSchema>;
export type ReturnTypeCreateResourceGroup = ActionState<
  ResourceGroupInputType,
  ResourceGroupType
>;

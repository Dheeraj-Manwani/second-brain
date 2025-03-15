import { ActionState } from "@/lib/create-safe-action";
import { z, ZodSchema } from "zod";
import { VisibilityEnum } from "../types";

const JsonValueSchema: ZodSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
  z.record(z.lazy(() => JsonValueSchema)),
  z.array(z.lazy(() => JsonValueSchema)),
]);

export const ResourceInput = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(250, "Title can take upto a max of 250 characters."),
  url: z.string().url("Invalid URL format."),
  description: z.string().optional(),
  resourceGroupId: z.string().min(1, "Select a resource group."),
});

export const ResourceTypeEnum = z.enum([
  "YOUTUBE_VIDEO",
  "INSTAGRAM_POST",
  "INSTAGRAM_REEL",
  "TWITTER_POST",
  "UNSUPPORTED",
]);
export type ResourceTypeEnumType = z.infer<typeof ResourceTypeEnum>;

export const ResourceSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().optional(),
  type: ResourceTypeEnum,
  title: z.string(),
  url: z.string().url(),
  order: z.number(),
  resourceGroupId: z.string(),
  description: z.string().nullable().optional(),
  metadata: JsonValueSchema,
  visibility: VisibilityEnum,
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date(),
  resourceStorage: z.object({ s3Url: z.string() }).optional().nullable(),
});

export type ResourceInputType = z.infer<typeof ResourceInput>;
export type ResourceType = z.infer<typeof ResourceSchema>;
export type ReturnTypeCreateResource = ActionState<
  ResourceInputType,
  ResourceType
>;

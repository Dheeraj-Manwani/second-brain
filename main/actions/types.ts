import { z } from "zod";

export interface QueryParams {
  // newResource?: "open" | "close";
}

// export type ResourceType = z.infer<typeof ResourceType>;

export const VisibilityEnum = z.enum(["PUBLIC", "PRIVATE"]);
export type VisibilityType = z.infer<typeof VisibilityEnum>;

import { ResourceType } from "@/actions/resource/schema";
import { create } from "zustand";

interface ResourceState {
  resources: ResourceType[];
  setResources: (resources: ResourceType[]) => void;
}

export const useResources = create<ResourceState>()((set) => ({
  resources: [],
  setResources: (input: ResourceType[]) => set(() => ({ resources: input })),
}));

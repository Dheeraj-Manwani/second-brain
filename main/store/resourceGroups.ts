import { ResourceGroupType } from "@/actions/resourceGroup/schema";
import { create } from "zustand";

interface ResourceGroupState {
  resourceGroups: ResourceGroupType[];
  setResourceGroups: (resourceGroups: ResourceGroupType[]) => void;
}

export const useResourceGroups = create<ResourceGroupState>()((set) => ({
  resourceGroups: [],
  setResourceGroups: (input: ResourceGroupType[]) =>
    set(() => ({ resourceGroups: input })),
}));

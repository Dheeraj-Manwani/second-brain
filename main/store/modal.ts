import { ResourceInputType, ResourceType } from "@/actions/resource/schema";
import { ResourceGroupType } from "@/actions/resourceGroup/schema";
import { create } from "zustand";
import { v4 as uuid } from "uuid";

export enum ModalType {
  NEW_RESOURCE = "NEW_RESOURCE",
  EXISTING_RESOURCE = "EXISTING_RESOURCE",
  NEW_RESOURCE_GROUP = "NEW_RESOURCE_GROUP",
  EXISTING_RESOURCE_GROUP = "EXISTING_RESOURCE_GROUP",
  CONFIRM = "CONFIRM",
}

export type ModalData =
  | ResourceType
  | ResourceGroupType
  | { message: string }
  | {};

export type OpenModalProp = { type: ModalType; data?: ModalData };

interface ModalState {
  isOpen: boolean;
  type?: ModalType;
  data?: ModalData;
  key: string;
  openModal: ({ type, data }: OpenModalProp) => void;
  closeModal: () => void;
}

export const useModalState = create<ModalState>()((set) => ({
  isOpen: false,
  type: undefined,
  data: {},
  key: "",
  openModal: ({ type, data }: OpenModalProp) =>
    set(() => ({ isOpen: true, type, data, key: uuid() })),
  closeModal: () => set(() => ({ isOpen: false })),
}));

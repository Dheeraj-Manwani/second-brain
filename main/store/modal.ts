import { create } from "zustand";

export enum ModalType {
  NEW_RESOURCE = "NEW_RESOURCE",
  EXISTING_RESOURCE = "EXISTING_RESOURCE",
  NEW_RESOURCE_GROUP = "NEW_RESOURCE_GROUP",
  EXISTING_RESOURCE_GROUP = "EXISTING_RESOURCE_GROUP",
}

interface ModalState {
  isOpen: boolean;
  type?: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const useModalState = create<ModalState>()((set) => ({
  isOpen: false,
  type: undefined,
  openModal: (type: ModalType) => set(() => ({ isOpen: true, type })),
  closeModal: () => set(() => ({ isOpen: false })),
}));

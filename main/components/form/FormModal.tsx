"use client";

import { AnimatePresence, motion } from "framer-motion";
import Modal from "../Modal";
import { useTheme } from "next-themes";
import useModal from "@/hooks/useModal";
import { MutableRefObject, RefObject, useEffect, useRef } from "react";
import { ModalType, useModalState } from "@/store/modal";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";

const getModalTitle = (type: ModalType | undefined) => {
  switch (type) {
    case ModalType.NEW_RESOURCE:
      return "New Resource";
    case ModalType.EXISTING_RESOURCE:
      return "Edit Resource";
    case ModalType.NEW_RESOURCE_GROUP:
      "New Resource Group";
    case ModalType.EXISTING_RESOURCE_GROUP:
      "Edit Resource Group";
    default:
      break;
  }
};

const getModalWidth = (type: ModalType | undefined) => {
  switch (type) {
    case ModalType.CONFIRM:
      return "md:max-w-2xl";

    case ModalType.NEW_RESOURCE:
    case ModalType.NEW_RESOURCE_GROUP:
      return "md:max-w-4xl";

    default:
      return "md:max-w-6xl";
  }
};

export const FormModal = ({ children }: { children: React.ReactNode }) => {
  const { ref, onClose, onOpen } = useModal();
  //   const formRef = useRef<HTMLFormElement>(null);
  const isModalOpen = useModalState((state) => state.isOpen);
  const modalType = useModalState((state) => state.type);
  const modalKey = useModalState((state) => state.key);
  const closeModal = useModalState((state) => state.closeModal);
  //   const handleModalClose = () => {
  //     closeModal();
  // router.push(
  //   getUpdatedUrl("/dashboard", searchParamsObject, { newResource: "close" })
  // );
  //   };

  useEffect(() => {
    if (isModalOpen) onOpen();
    else onClose();
  }, [isModalOpen]);

  return (
    <Modal ref={ref} onClose={closeModal} key={modalKey}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-md" />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            type: "spring",
            damping: 10,
          }}
          className={twMerge(
            "fixed inset-0 mx-auto flex w-full max-w-screen-md items-center justify-center p-4 md:p-8",
            getModalWidth(modalType)
          )}
        >
          <div className="flex max-h-[80vh] w-full flex-col gap-4 overflow-y-auto rounded-xl border border-primary/10 bg-background p-6">
            <div className="flex items-center justify-between gap-4 border-b pb-4">
              <h2 className="text-xl font-bold tracking-tighter md:text-2xl">
                {getModalTitle(modalType)}
              </h2>
              <Button
                type="button"
                variant={"destructive"}
                size={"icon"}
                onClick={closeModal}
              >
                <X className="size-4" />
              </Button>
            </div>
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
      {/* </dialog> */}
    </Modal>
  );
};

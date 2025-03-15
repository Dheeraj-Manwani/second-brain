// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { redirect, useSearchParams } from "next/navigation";
// import { AnimatePresence, motion } from "framer-motion";
// import useModal from "@/hooks/useModal";
// import Modal from "@/components/Modal";
// import { Button } from "../ui/button";
// import { X } from "lucide-react";
// import { useTheme } from "next-themes";
// import { FormPostInput } from "../form/form-input";
// import { useAction } from "@/hooks/useAction";
// import { createResource } from "@/actions/resource";
// import { toast } from "sonner";
// import { FormError } from "../form/form-errors";
// import { useModalState } from "@/store/modal";
// import { ResourceInput } from "@/actions/resource/schema";
// import { FormModal } from "../form/FormModal";

// export const NewResource = () => {
//   // const { ref, onClose, onOpen } = useModal();
//   // const formRef = useRef<HTMLFormElement>(null);
//   const theme = useTheme();
//   // const isModalOpen = useModalState((state) => state.isOpen);
//   // const closeModal = useModalState((state) => state.closeModal);

//   // const searchParams = useSearchParams();
//   // const newResource = searchParams.get("newResource");
//   // const searchParamsObject = searchParamsToObject(searchParams);

//   const { execute, fieldErrors, error, data, isLoading, setFieldErrors } =
//     useAction(createResource, {
//       // toastMessages: {
//       //   loading: "Submitting Resource...",
//       //   success: "Resource Submitted Successfully!",
//       // },
//       schema: ResourceInput,
//     });

//   // const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//   //   event.preventDefault();

//   //   const formData = new FormData(event.currentTarget);

//   //   const res = await execute(Object.fromEntries(formData.entries()) as any);
//   //   if (res?.success) {
//   //     formRef.current?.reset();
//   //     closeModal();
//   //     redirect("/resources");
//   //   }
//   // };

//   // const handleModalClose = () => {
//   //   closeModal();
//   // router.push(
//   //   getUpdatedUrl("/dashboard", searchParamsObject, { newResource: "close" })
//   // );
//   // };

//   // useEffect(() => {
//   //   let timeoutId: any;
//   //   if (newResource === "open") {
//   //     onOpen();
//   //   } else {
//   //     onClose();
//   //   }
//   //   return () => {
//   //     clearTimeout(timeoutId);
//   //   };
//   // }, [ref, onClose, onOpen, newResource]);

//   // useEffect(() => {
//   //   console.log("inside use effect isModalOpen", isModalOpen);
//   //   if (isModalOpen) onOpen();
//   //   else onClose();
//   // }, [isModalOpen]);

//   return (
//     // <Modal ref={ref} onClose={onClose}>
//     //   <div className="fixed inset-0 bg-black/50 backdrop-blur-md" />
//     //   <AnimatePresence>
//     //     <form ref={formRef} onSubmit={onSubmit}>
//     //       <motion.div
//     //         initial={{ opacity: 0, y: 20 }}
//     //         animate={{ opacity: 1, y: 0 }}
//     //         transition={{
//     //           duration: 0.5,
//     //           ease: "easeInOut",
//     //           type: "spring",
//     //           damping: 10,
//     //         }}
//     //         className="fixed inset-0 mx-auto flex w-full max-w-screen-md items-center justify-center p-4 md:max-w-4xl md:p-8"
//     //       >
//     //         <div className="flex max-h-[80vh] w-full flex-col gap-4 overflow-y-auto rounded-xl border border-primary/10 bg-background p-6">
//     //           <div className="flex items-center justify-between gap-4 border-b pb-4">
//     //             <h2 className="text-xl font-bold tracking-tighter md:text-2xl">
//     //               <span>New</span> Resource
//     //             </h2>
//     //             <Button
//     //               type="button"
//     //               variant={"destructive"}
//     //               size={"icon"}
//     //               onClick={handleModalClose}
//     //             >
//     //               <X className="size-4" />
//     //             </Button>
//     //           </div>
//     <FormModal
//       // onSubmit={onSubmit}
//       title="New Resource from form modal"
//       // formRef={formRef}
//     >
//       <>
//         <FormError error={error} />
//         <div className="flex w-full flex-col gap-2">
//           <h3 className="wmde-markdown-var text-lg font-semibold tracking-tighter">
//             Title*
//           </h3>
//           <FormPostInput
//             id="title"
//             placeholder="Title"
//             errors={fieldErrors}
//             className="w-full"
//           />
//         </div>
//         <div className="flex w-full flex-col gap-2">
//           <h3 className="wmde-markdown-var text-lg font-semibold tracking-tighter">
//             URL*
//           </h3>
//           <FormPostInput
//             id="url"
//             placeholder="Paste resource url here"
//             errors={fieldErrors}
//             className="w-full"
//           />
//         </div>
//         <div className="flex w-full flex-col gap-2">
//           <h3 className="wmde-markdown-var text-lg font-semibold tracking-tighter">
//             Desciption{" "}
//             <span className="font-normal tracking-normal text-sm">
//               (optional)
//             </span>
//           </h3>
//           <FormPostInput
//             id="description"
//             type="textarea"
//             placeholder="Description (optional)"
//             errors={fieldErrors}
//             className="w-full"
//           />
//         </div>

//         <div data-color-mode={theme} className="flex w-full flex-col gap-2">
//           <Button type="submit" variant={"default"} className="md:w-fit">
//             Import
//           </Button>
//         </div>
//       </>
//     </FormModal>
//     //       </div>
//     //     </motion.div>
//     //   </form>
//     // </AnimatePresence>
//     // </Modal>
//   );
// };

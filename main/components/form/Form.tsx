"use client";

import { createResource } from "@/actions/resource";
import { ResourceInput, ResourceType } from "@/actions/resource/schema";
import { useAction } from "@/hooks/useAction";
import { ModalData, ModalType, useModalState } from "@/store/modal";
// import { useRouter } from "next/router";
import { useRef } from "react";
import { FormModal } from "./FormModal";
import {
  EditResourceForm,
  NewResourceForm,
  NewResourceGroupForm,
} from "../resource/ResourceForms";
import { FieldErrors } from "@/lib/create-safe-action";
import { redirect } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { createResourceGroup } from "@/actions/resourceGroup";

const getForm = (
  modalType: ModalType | undefined,
  modalData: ModalData,
  key: string
) => {
  switch (modalType) {
    case ModalType.NEW_RESOURCE:
      return <NewResourceForm key={key} />;
    case ModalType.EXISTING_RESOURCE:
      return (
        <EditResourceForm resource={modalData as ResourceType} key={key} />
      );
    case ModalType.NEW_RESOURCE_GROUP:
      return <NewResourceGroupForm />;
    default:
      <div>Form not found</div>;
  }
};

export const GenericForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const modalType = useModalState((state) => state.type);
  const modalData = useModalState((state) => state.data);
  const modalKey = useModalState((state) => state.key);

  const closeModal = useModalState((state) => state.closeModal);
  const router = useRouter();

  // if (!serverAction) return <div>Unknwon form</div>;

  // const searchParams = useSearchParams();
  // const newResource = searchParams.get("newResource");
  // const searchParamsObject = searchParamsToObject(searchParams);

  const { execute, fieldErrors, error, data, isLoading, setFieldErrors } =
    useAction(createResource, {
      // toastMessages: {
      //   loading: "Submitting Resource...",
      //   success: "Resource Submitted Successfully!",
      // },
      schema: ResourceInput,
    });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await execute(Object.fromEntries(formData.entries()) as any);
    if (res?.success) {
      formRef.current?.reset();
      closeModal();
      router.push("/resources");
      // redirect("/resources");
    }
  };
  return (
    <FormModal
    // onSubmit={onSubmit}
    // formRef={formRef}
    >
      {getForm(modalType, modalData || {}, modalKey)}
    </FormModal>
  );
};

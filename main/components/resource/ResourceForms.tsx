"use client";

import { useTheme } from "next-themes";
import { FormError } from "../form/form-errors";
import { FormPostInput } from "../form/form-input";
import { Button } from "../ui/button";
import { FieldErrors } from "@/lib/create-safe-action";
import { useModalState } from "@/store/modal";
import { useRef } from "react";
import { useAction } from "@/hooks/useAction";
import { createResource } from "@/actions/resource";
import { ResourceInput } from "@/actions/resource/schema";
import { redirect } from "next/navigation";
import {
  createResourceGroup,
  getResourceGroupsForSelect,
} from "@/actions/resourceGroup";
import { ResourceGroupInput } from "@/actions/resourceGroup/schema";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubmitButton from "../SubmitButton";
import { Dropdown } from "../Dropdown";
import { useResourceGroups } from "@/store/resourceGroups";

export const NewResourceForm = () => {
  const theme = useTheme();
  const formRef = useRef<HTMLFormElement>(null);
  const closeModal = useModalState((state) => state.closeModal);
  const resourceGroups = useResourceGroups((state) => state.resourceGroups);
  const resourceGroupOptions = resourceGroups.map((rg) => {
    return { label: rg.title, value: rg.id, type: rg.type };
  });
  resourceGroupOptions.sort((a, b) =>
    a.type === "DEFAULT" ? -1 : b.type === "DEFAULT" ? 1 : 0
  );

  const { execute, fieldErrors, error, data, isLoading, setFieldErrors } =
    useAction(createResource, {
      schema: ResourceInput,
    });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log("Created a resource", Object.fromEntries(formData.entries()));
    // return;
    const res = await execute(Object.fromEntries(formData.entries()) as any);
    if (res?.success) {
      formRef.current?.reset();
      closeModal();
      redirect("/resources");
    }
  };
  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <FormError error={error} />
      <div className="flex gap-1 justify-between w-full mb-2">
        <div className="flex flex-col w-1/2 gap-2">
          {/* <h3 className="wmde-markdown-var text-lg font-semibold tracking-tighter">
              Title*
            </h3> */}
          <FormPostInput
            id="title"
            label="Title*"
            placeholder="Title"
            errors={fieldErrors}
            className="w-full"
          />
        </div>
        <Dropdown
          id="resourceGroupId"
          label="Resource Group*"
          placeholder="Select Resource Group"
          options={resourceGroupOptions}
          errors={fieldErrors}
          // defaultValue={resourceGroupOptions[0]}
          getOptionsAsync={getResourceGroupsForSelect}
        />
      </div>
      <div className="flex w-full flex-col gap-2 mb-2">
        <FormPostInput
          id="url"
          label="URL*"
          placeholder="Paste resource url here"
          errors={fieldErrors}
          className="w-full"
        />
      </div>
      <div className="flex w-full flex-col gap-2 mb-4">
        <FormPostInput
          label="Description (optional)"
          id="description"
          type="textarea"
          placeholder="Description (optional)"
          errors={fieldErrors}
          className="w-full"
        />
      </div>

      <div data-color-mode={theme} className="flex w-full">
        <SubmitButton
          isLoading={isLoading}
          transitionName="Importing..."
          className="md:w-fit min-w-40"
        >
          Import
        </SubmitButton>
      </div>
    </form>
  );
};

export const NewResourceGroupForm = () => {
  const theme = useTheme();
  const formRef = useRef<HTMLFormElement>(null);
  const closeModal = useModalState((state) => state.closeModal);
  const { execute, fieldErrors, error, data, isLoading, setFieldErrors } =
    useAction(createResourceGroup, {
      schema: ResourceGroupInput,
    });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await execute(Object.fromEntries(formData.entries()) as any);
    console.log("Created a resource group ::::::", formData);

    if (res?.success) {
      formRef.current?.reset();
      closeModal();
      redirect("/resources");
    }
  };
  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <FormError error={error} />
      <div className="flex w-full flex-col gap-2">
        {/* <h3 className="wmde-markdown-var text-lg font-semibold tracking-tighter">
          Resource Group Title
        </h3> */}
        <FormPostInput
          id="title"
          label="Resource Group Title*"
          placeholder="Title"
          errors={fieldErrors}
          className="w-full"
        />
      </div>
      <div data-color-mode={theme} className="flex w-full flex-col gap-2 mt-4">
        <SubmitButton
          transitionName="Creating..."
          className="md:w-fit"
          isLoading={isLoading}
        >
          Create
        </SubmitButton>
      </div>
    </form>
  );
};

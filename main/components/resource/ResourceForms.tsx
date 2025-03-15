"use client";

import { useTheme } from "next-themes";
import { FormError, FormPostErrors } from "../form/form-errors";
import { FormPostInput } from "../form/form-input";
import { Button } from "../ui/button";
import { FieldErrors } from "@/lib/create-safe-action";
import { useModalState } from "@/store/modal";
import { useRef } from "react";
import { useAction } from "@/hooks/useAction";
import { createResource, updateResource } from "@/actions/resource";
import {
  ResourceInput,
  ResourceType,
  UpdateResourceInput,
} from "@/actions/resource/schema";
import { redirect } from "next/navigation";
import {
  createResourceGroup,
  getResourceGroupsForSelect,
} from "@/actions/resourceGroup";
import { ResourceGroupInput } from "@/actions/resourceGroup/schema";
import { v4 as uuid } from "uuid";
import SubmitButton from "../SubmitButton";
import { Dropdown } from "../Dropdown";
import { useResourceGroups } from "@/store/resourceGroups";
import { twMerge } from "tailwind-merge";
import { ResourceGroupTypeSchema, ResourceTypeSchema } from "@prisma/client";
import { SocialEmbed } from "../socials/SocialEmbed";
import {
  getResourceGroupOptions,
  visibilityDropdownOptions,
} from "@/lib/utils";
import { useRouter } from "nextjs-toploader/app";
import { useResources } from "@/store/resources";

export const NewResourceForm = ({ key }: { key: string }) => {
  const theme = useTheme();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const closeModal = useModalState((state) => state.closeModal);
  const resourceGroups = useResourceGroups((state) => state.resourceGroups);
  const resourceGroupOptions = getResourceGroupOptions(resourceGroups);

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
      // redirect("/resources");
      router.push("/resources");
    }
  };
  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <FormError error={error} />
      <div className="flex gap-1 justify-between w-full mb-2">
        <div className="flex flex-col w-1/2 gap-2">
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
          disabled={isLoading}
          options={resourceGroupOptions}
          errors={fieldErrors}
          defaultValue={resourceGroupOptions[0]}
          getOptionsAsync={getResourceGroupsForSelect}
          className="w-1/2"
        />
      </div>
      <FormPostInput
        id="url"
        label="URL*"
        placeholder="Paste resource url here"
        errors={fieldErrors}
        className="mb-2"
      />
      <FormPostInput
        label="Description (optional)"
        id="description"
        type="textarea"
        placeholder="Description (optional)"
        errors={fieldErrors}
        className="w-full mb-4"
      />

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
  const router = useRouter();
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
      // redirect("/resources");
      router.push("/resources");
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

export function EditResourceForm({
  resource,
  key,
}: {
  resource: ResourceType;
  key: string;
}) {
  const resourceGroups = useResourceGroups((state) => state.resourceGroups);
  const resourceGroupOptions = getResourceGroupOptions(resourceGroups);
  const setResources = useResources((state) => state.setResources);
  const resourcesInState = useResources((state) => state.resources);
  let currentResourceInState =
    resourcesInState.find((obj) => obj.id === resource.id) || resource;
  const theme = useTheme();
  const router = useRouter();
  const closeModal = useModalState((state) => state.closeModal);
  const { execute, fieldErrors, error, isLoading, setFieldErrors } = useAction(
    updateResource,
    {
      schema: UpdateResourceInput,
    }
  );

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log("Updating a resource", Object.fromEntries(formData.entries()));
    // return;
    const resourcedata = {
      ...(Object.fromEntries(formData.entries()) as any),
      id: resource.id,
    };
    const res = await execute(resourcedata);

    if (res?.success) {
      const currentResource = resourcesInState.find(
        (obj) => obj.id === resource.id
      );

      if (currentResource) {
        const updatedResource = { ...currentResource };
        updatedResource.title = resourcedata.title;
        updatedResource.visibility = resourcedata.visibility;
        updatedResource.resourceGroupId = resourcedata.resourceGroupId;
        updatedResource.description = resourcedata.description;

        setResources([...resourcesInState, updatedResource]);
      }

      formRef.current?.reset();
      closeModal();
      // redirect("/resources");
      router.push("/resources");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between" key={key}>
      <div
        className={twMerge(
          "pl-5 w-full",
          resource.type !== ResourceTypeSchema.YOUTUBE_VIDEO && "mt-2 w-4/6"
        )}
      >
        <form ref={formRef} onSubmit={onSubmit} key={key}>
          <FormError error={error} />
          <div className="flex flex-col justify-between w-full mb-2">
            {/* <div className="flex flex-col w-1/2 gap-2"> */}
            <FormPostInput
              id="title"
              label="Title*"
              placeholder="Title"
              defaultValue={currentResourceInState.title}
              errors={fieldErrors}
              className="w-full mb-2"
            />
            <Dropdown
              id="visibility"
              label="Visibility*"
              placeholder="Select Resource Group"
              options={visibilityDropdownOptions}
              errors={fieldErrors}
              defaultValue={
                currentResourceInState.visibility === "PUBLIC"
                  ? { label: "Public", value: "PUBLIC" }
                  : { label: "Private", value: "PRIVATE" }
              }
              className="w-full mb-2"
            />
            <Dropdown
              id="resourceGroupId"
              label="Resource Group*"
              placeholder="Select Resource Group"
              disabled={isLoading}
              options={resourceGroupOptions}
              errors={fieldErrors}
              defaultValue={{
                label:
                  currentResourceInState.resourceGroup?.title ??
                  "Resource Group",
                value: currentResourceInState.resourceGroupId,
              }}
              getOptionsAsync={getResourceGroupsForSelect}
              className="w-full mb-2"
            />
            <FormPostInput
              label="Description (optional)"
              id="description"
              type="textarea"
              placeholder="Description (optional)"
              defaultValue={currentResourceInState.description || ""}
              errors={fieldErrors}
              className="w-full mb-5 h-20"
            />
            <div data-color-mode={theme} className="flex w-full">
              <SubmitButton
                isLoading={isLoading}
                transitionName="Updating..."
                className="w-full"
              >
                Update
              </SubmitButton>
            </div>
          </div>
        </form>
      </div>
      <div
        className={twMerge(
          "flex justify-center items-start pt-2",
          resource.type !== ResourceTypeSchema.YOUTUBE_VIDEO ? "w-1/2" : "p-3"
        )}
      >
        <SocialEmbed
          url={resource?.url}
          type={resource.type}
          coverImageUrl={resource.resourceStorage?.s3Url}
          // key={uuid()}
        />
      </div>
    </div>
  );
}

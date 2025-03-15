"use client";

import { Button } from "@/components/ui/button";
import { Edit, Instagram, MoveLeft, MoveRight, View, X } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

import Modal from "@/components/Modal";
import useModal from "@/hooks/useModal";
import { FormPostInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/useAction";
import { getResourceById } from "@/actions/resource";
import { FormError } from "@/components/form/form-errors";
import { InstagramEmbed } from "react-social-media-embed";
import { twMerge } from "tailwind-merge";
import ViewReource from "@/components/resource/ViewResource";
import { useResources } from "@/store/resources";
import { ResourceType } from "@/actions/resource/schema";
import ReadMore from "@/components/ui/Readmore";
import { SocialEmbed } from "@/components/socials/SocialEmbed";
import { getResourceTypeLabel } from "@/components/socials/SocialCard";
import { SocialSkeleton } from "@/components/skeletons/SocialSkeletons";

export default function ResourceModal() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const resources = useResources((state) => state.resources);
  if (!id) return null;

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [embedKey, setEmbedKey] = useState<string>(uuid());

  const { execute, error, data, isLoading, setData } =
    useAction(getResourceById);

  console.log("Inside intercepting route ====== ");

  useEffect(() => {
    const currentResource = resources.find((res) => res.id === id);
    if (currentResource) {
      console.log("found resource in state ", currentResource);
      setData(currentResource);
    } else {
      console.log("Using id in use efff to fetch ", id);
      execute(id)
        .then((res) => {
          console.log("done fetching", res);
        })
        .catch((err) => console.log("Error occured", err));
    }
    dialogRef.current?.showModal();
  }, []);

  const openNextResouce = (direction: number) => {
    const currIndex = resources.findIndex((res) => res.id === id);
    if (direction === 1 && currIndex < resources.length - 1) {
      router.push(
        `/resources/${params.resourceGroupSlug}/${resources[currIndex + 1].id}`
      );
    } else if (currIndex > 0) {
      router.push(
        `/resources/${params.resourceGroupSlug}/${resources[currIndex - 1].id}`
      );
    }
  };

  const isNextResourcePresent = (direction: number): boolean => {
    const currIndex = resources.findIndex((res) => res.id === id);
    if (direction === 1) return currIndex < resources.length - 1;
    return currIndex > 0;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log("Form data in edit modak", formData);

    // await execute(Object.fromEntries(formData.entries()) as any);
  };
  console.log("isNextResourcePresent(1) ========= ", isNextResourcePresent(1));
  console.log(
    "isNextResourcePresent(-1) ========= ",
    isNextResourcePresent(-1)
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const handleDialogClose = () => {
    dialogRef.current?.close();
    router.push(`/resources/${params.resourceGroupSlug}`);
    setEmbedKey(uuid());
    // redirect("/resources");
  };
  return (
    <dialog
      ref={dialogRef}
      onClose={handleDialogClose}
      className="border p-4 rounded backdrop:bg-slate-300/50"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-md">
        <AnimatePresence>
          {data && isNextResourcePresent(-1) && (
            <Button
              className="absolute top-1/2 left-1 z-50"
              size={"icon"}
              onClick={() => openNextResouce(-1)}
            >
              <MoveLeft />
            </Button>
          )}
          <form ref={formRef} onSubmit={onSubmit}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                type: "spring",
                damping: 10,
              }}
              className="fixed inset-0 mx-auto flex w-full max-w-screen-md items-center justify-center p-2 md:max-w-4xl md:p-8"
            >
              <div className="flex max-h-[80vh] w-full flex-col gap-4 overflow-y-auto rounded-xl border border-primary/10 bg-background p-3">
                <div className="flex justify-end gap-4 border-b pb-3">
                  {/* <h2 className="text-xl font-bold tracking-tighter md:text-2xl">
                    <span>full page resoruces</span>
                  </h2> */}
                  {data && (
                    <Button
                      // className="bg-secondary "
                      type="button"
                      variant={"default"}
                      size={"miniIcon"}
                      onClick={() => {}}
                    >
                      <Edit className="size-4" />
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant={"destructive"}
                    size={"miniIcon"}
                    onClick={handleDialogClose}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
                {/* <FormError error={error} /> */}
                {/* <ViewReource id={id}/> */}
                {/* <div className="flex flex-col md:flex-row">
                  {data && (
                    <>
                      <div className={"w-1/2 pl-5 pt-2"}>
                        <h2 className="text-2xl font-extrabold dark:text-white">
                          {data?.title}
                        </h2>
                 
                        <div className="flex items-center gap-1 text-slate-500">
                          {getResourceTypeLabel(data.type, "w-[1rem] h-[1rem]")}
                        </div>
                        <p className="my-4 text-lg text-gray-500">
                          <ReadMore text={data?.description} maxLength={150} />
                        </p>
                      </div>
                      <div className="w-1/2 flex justify-center items-start pt-2">
                        <SocialEmbed
                          url={data?.url}
                          type={data.type}
                          coverImageUrl={data.resourceStorage?.s3Url}
                        />
                      </div>
                    </>
                  )}

                </div> */}
                {data && <ViewReource resource={data} embedKey={embedKey} />}

                {!data && <SocialSkeleton />}

                {/* Implement edit */}
                {isEditMode && (
                  <div>
                    <div className="flex w-full flex-col gap-2">
                      <h3 className="wmde-markdown-var text-lg font-semibold tracking-tighter">
                        Title*
                      </h3>
                      <FormPostInput
                        id="title"
                        placeholder="Title"
                        // errors={fieldErrors}
                        className="w-full"
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2">
                      <h3 className="wmde-markdown-var text-lg font-semibold tracking-tighter">
                        URL*
                      </h3>
                      <FormPostInput
                        id="url"
                        placeholder="Paste resource url here"
                        // errors={fieldErrors}
                        className="w-full"
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2">
                      <h3 className="wmde-markdown-var text-lg font-semibold tracking-tighter">
                        Desciption{" "}
                        <span className="font-normal tracking-normal text-sm">
                          (optional)
                        </span>
                      </h3>
                      <FormPostInput
                        id="description"
                        type="textarea"
                        placeholder="Description (optional)"
                        // errors={fieldErrors}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </form>
          {data && isNextResourcePresent(1) && (
            <Button
              className="absolute top-1/2 right-1 z-50"
              size={"icon"}
              onClick={() => openNextResouce(1)}
            >
              <MoveRight />
            </Button>
          )}
        </AnimatePresence>
      </div>
    </dialog>
  );
}

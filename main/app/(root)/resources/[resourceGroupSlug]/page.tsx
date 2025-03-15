"use server";

import { getResources } from "@/actions/resource";
import { getServerSession } from "next-auth";

import { SocialCards } from "@/components/socials/SocialCards";
import { authConfig } from "@/lib/auth";
import { GenericForm } from "@/components/form/Form";
import { use } from "react";
// import { useParams } from "next/navigation";

interface paramsType {
  resourceGroupSlug?: string | string[];
}

export default async function ResourcePage({ params }: { params: paramsType }) {
  // const { ref, onOpen } = useModal();
  // @ts-ignore
  const session: session | null = await getServerSession(authConfig);
  const userId = session?.user?.id;
  if (!userId) return <div>Please Log in to view resources.</div>;

  // const { resourceGroupSlug } = useParams();
  const { resourceGroupSlug } = await params;
  if (!resourceGroupSlug) return <div>Resource Group not identified.</div>;

  const slug = Array.isArray(resourceGroupSlug)
    ? resourceGroupSlug[0]
    : resourceGroupSlug;

  const resources = await getResources(userId, slug);

  return (
    <>
      <div className="flex relative flex-wrap">
        {!resources.data || resources.data.length === 0 ? (
          <div className="w-full">
            <span className="text-black">No Resources Created Yet</span>
          </div>
        ) : (
          <SocialCards resources={resources.data} />
        )}
        {/* <SocialCard /> */}
        {/* <Button onClick={onOpen}>aaaa</Button> */}
        {/* <Modal ref={ref} onClose={() => {}}>
        <div>aa</div>
        </Modal> */}
        {/* <NewResource /> */}
        <GenericForm />
      </div>
    </>
  );
}

"use server";

import { getResources } from "@/actions/resource";
import { getServerSession } from "next-auth";

import { SocialCards } from "@/components/socials/SocialCards";
import { authConfig } from "@/lib/auth";
import { GenericForm } from "@/components/form/Form";
import { getResourceGroups } from "@/actions/resourceGroup";
import { FolderCard } from "@/components/socials/FolderCard";
import { FolderCards } from "@/components/socials/FolderCards";

export default async function DashboardPage() {
  // const { ref, onOpen } = useModal();
  // @ts-ignore
  const session: session | null = await getServerSession(authConfig);
  const userId = session?.user?.id;
  if (!userId) return <div>Please Log in to view resources.</div>;

  const resourceGroups = await getResourceGroups(userId);

  return (
    <>
      <div className="flex relative flex-wrap">
        {!resourceGroups.data || resourceGroups.data.length === 0 ? (
          <div className="w-full">
            <span className="text-black">No Resources Groups Created Yet</span>
          </div>
        ) : (
          <FolderCards resourceGroups={resourceGroups.data} />
        )}
        <GenericForm />
      </div>
    </>
  );
}

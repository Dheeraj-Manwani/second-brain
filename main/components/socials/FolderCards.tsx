"use client";

import { ResourceType } from "@/actions/resource/schema";
import { SocialCard } from "./SocialCard";
import { useResources } from "@/store/resources";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { FolderCard } from "./FolderCard";
import { ResourceGroupType } from "@/actions/resourceGroup/schema";
import { useResourceGroups } from "@/store/resourceGroups";

export const FolderCards = ({
  resourceGroups,
}: {
  resourceGroups: ResourceGroupType[];
}) => {
  const setResourceGroups = useResourceGroups(
    (state) => state.setResourceGroups
  );

  useEffect(() => {
    setResourceGroups(resourceGroups);
  }, []);

  return (
    <>
      {resourceGroups.map((resourceGroup) => (
        <FolderCard resourceGroup={resourceGroup} key={uuid()} />
      ))}
    </>
  );
};

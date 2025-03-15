"use client";

import { ResourceType } from "@/actions/resource/schema";
import { SocialCard } from "./SocialCard";
import { useResources } from "@/store/resources";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { FolderCard } from "./FolderCard";

export const SocialCards = ({ resources }: { resources: ResourceType[] }) => {
  const setResources = useResources((state) => state.setResources);

  useEffect(() => {
    setResources(resources);
  }, []);

  return (
    <>
      {resources.map((resource) => (
        <SocialCard resource={resource} key={uuid()} />
      ))}
    </>
  );
};

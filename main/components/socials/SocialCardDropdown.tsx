"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVertical,
  ExternalLink,
  Eye,
  EyeOff,
  Fullscreen,
  Pencil,
  Trash2,
} from "lucide-react";
import { ResourceType, ResourceTypeEnumType } from "@/actions/resource/schema";
import { getApplicatinoName } from "@/lib/utils";
import Link from "next/link";
import { VisibilityType } from "@/actions/types";
import { ModalType, useModalState } from "@/store/modal";

export function ResourceDropdown({
  resource,
  resourceGroupSlug,
  changeVisibility,
}: {
  resource: ResourceType;
  resourceGroupSlug: string;
  changeVisibility: (resourceId: string, type: VisibilityType) => void;
}) {
  const openModal = useModalState((state) => state.openModal);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <EllipsisVertical size={17} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup className="cursor-pointer">
          <DropdownMenuItem>
            <Link
              href={resource.url}
              target="_blank"
              className="w-full flex gap-2"
            >
              Open ({getApplicatinoName(resource.type)})
              <ExternalLink size={18} />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`${resourceGroupSlug}/${resource.id}`}
              className="w-full flex justify-between"
            >
              View <Fullscreen size={18} />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="w-full flex justify-between cursor-pointer"
            onClick={() =>
              changeVisibility(
                resource.id,
                resource.visibility === "PUBLIC" ? "PRIVATE" : "PUBLIC"
              )
            }
          >
            {resource.visibility === "PUBLIC" ? (
              <>
                Make it Private <EyeOff size={18} />
              </>
            ) : (
              <>
                Make it Public <Eye size={18} />
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer flex justify-between"
            onClick={() =>
              openModal({ type: ModalType.EXISTING_RESOURCE, data: resource })
            }
          >
            Edit <Pencil />
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer  hover:bg-red-400 flex justify-between">
            Delete <Trash2 />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

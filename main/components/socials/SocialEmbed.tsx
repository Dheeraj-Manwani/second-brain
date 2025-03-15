import { ResourceTypeEnumType } from "@/actions/resource/schema";
import { ResourceTypeSchema } from "@prisma/client";
import Image from "next/image";
import {
  InstagramEmbed,
  TwitterEmbed,
  YouTubeEmbed,
} from "react-social-media-embed";
import { EmbeddedTweet } from "react-tweet";
import { getCoverImage } from "./SocialCard";

export const SocialEmbed = ({
  type,
  url,
  coverImageUrl,
  key = "social_embedded_key",
}: {
  type: ResourceTypeEnumType;
  url: string;
  coverImageUrl?: string;
  key?: string;
}) => {
  switch (type) {
    case ResourceTypeSchema.INSTAGRAM_REEL:
    case ResourceTypeSchema.INSTAGRAM_POST:
      return <InstagramEmbed url={url} width={325} key={key} />;
    case ResourceTypeSchema.TWITTER_POST:
      return <TwitterEmbed url={url} width={325} key={key} />;
    case ResourceTypeSchema.YOUTUBE_VIDEO:
      return <YouTubeEmbed url={url} width={550} key={key} />;
    case ResourceTypeSchema.UNSUPPORTED:
    default:
      return (
        <Image
          src={getCoverImage(type, coverImageUrl)}
          alt={"Resource Cover Image"}
          priority
          width={50}
          height={50}
          quality={100}
        />
      );
  }
};

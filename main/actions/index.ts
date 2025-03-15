"use server";

import axios, { AxiosResponse } from "axios";

export const generateImage = async (
  systemPrompt: string | undefined,
  userPrompt: string | undefined
): Promise<Buffer | undefined> => {
  if (!systemPrompt || !userPrompt) return;
  const thumbnail: AxiosResponse = await axios.get(
    `${process.env.IMAGE_GENERATION_API}/${systemPrompt}${encodeURIComponent(
      userPrompt
    )}`,
    { responseType: "arraybuffer" }
  );

  return Buffer.from(thumbnail.data, "binary");
};

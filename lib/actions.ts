"use server";

import { auth } from "@/auth";
import { FormData } from "./validation";
import { ParseServerResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (formData: FormData) => {
  const session = await auth();

  if (!session)
    return ParseServerResponse({ error: "Not signed in", status: "ERROR" });

  const slug = slugify(formData.title, { lower: true, strict: true });

  try {
    const startup = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      image: formData.link,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch: formData.pitch,
      views: 0,
    };

    const res = await writeClient.create({ _type: "startup", ...startup });

    return ParseServerResponse({
      ...res,
      error: "",
      status: "SUCCESS",
    });
  } catch (err) {
    console.log("Error:", err);
    return ParseServerResponse({ error: JSON.stringify(err), status: "Error" });
  }
};

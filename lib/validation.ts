import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z
    .string()
    .url()
    // .refine((url) => /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(url), {
    //   message: "URL must end in .jpg, .png, .gif, etc.",
    // }),
  .refine(async (url) => {
    try {
      const res = await fetch(url, { method: "HEAD" });
      // const contentType = res.headers.get("content-type:");
      // return contentType?.startsWith("image/");
      return res.ok;
    } catch {
      return false;
    }
  }, "URL not reachable or invalid"),
  pitch: z.string().min(10),
});

export type FormData = z.infer<typeof formSchema>;

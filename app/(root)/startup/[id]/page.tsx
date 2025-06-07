import { client } from "@/sanity/lib/client";
import { STARTUP_BY_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

const page = async ({params}: {params: Promise<{id: string}>}) => {
    const { id }  = await params;
    const post = await client.fetch(STARTUP_BY_QUERY, {id} );
    if (!post) notFound();
  return (
    <>
    <h1 className="text-3xl">{post.title}</h1>
    </>
  )
}

export default page
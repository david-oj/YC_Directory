// import { auth } from "@/auth";
import Hero from "@/components/Home/Hero";
import Startups from "@/components/Home/Startups";

export default async function Homepage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  // const session = await auth();

  // console.log("Session:", session?.id);

  return (
    <>
      <Hero query={query} />
      <Startups query={query} />
    </>
  );
}

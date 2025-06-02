import Hero from "./section/Hero";
import Startups from "./section/Startups";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  return (
    <>
      <Hero query={query} />
      <Startups query={query} />
    </>
  );
}

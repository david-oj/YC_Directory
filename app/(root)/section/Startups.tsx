import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { sanityFetch } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

const Startups = async ({ query }: { query?: string }) => {
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY });

  return (
    <section className="section_container">
      <p className="text-30-semibold">
        {query ? `Search results for "${query}"` : "All Startups"}
      </p>

      <ul className="mt-7 card_grid">
        {posts?.length > 0 ? (
          posts.map((post: StartupCardType) => (
            <StartupCard key={post?._id} post={post} />
          ))
        ) : (
          <p className="no-results">No startups found</p>
        )}
      </ul>
    </section>
  );
};

export default Startups;

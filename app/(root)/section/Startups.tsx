import StartupCard from "@/components/StartupCard";
import placeholder from "../placeholder.jpg";

const posts = [
  {
    _createdAt: new Date(),
    views: 55,
    author: { _id: 1, name: "Ojo David Ajibola" },
    _id: 1,
    description: "This is a description",
    image: placeholder,
    category: "Quantum Computing",
    title: "Ryzen 14 & Quantum computing",
  },
];

const Startups = ({ query }: { query?: string }) => {
  return (
    <section className="section_container">
      <p className="text-30-semibold">
        {query ? `Search results for "${query}"` : "All Startups"}
      </p>

      <ul className="mt-7 card_grid">
        {posts?.length > 0 ? (
          posts.map((post: StartupCardType) => <StartupCard key={post?._id} post={post} />)
        ) : (
          <p className="no-results">No startups found</p>
        )}
      </ul>
    </section>
  );
};

export default Startups;

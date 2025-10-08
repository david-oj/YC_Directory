"use client";

import Ping from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { useEffect, useState, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const View = ({ id }: { id: string }) => {
  const [totalViews, setTotalViews] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const handleViews = async () => {
      try {
        // POST to increment
        await fetch(`/api/views/${id}`, { method: "POST" });

        // then fetch updated count
        const data = await client
          .withConfig({ useCdn: false })
          .fetch(STARTUP_VIEWS_QUERY, { id });

        setTotalViews(data.views);
      } catch (error) {
        console.error("Failed to update views:", error);
      }
    };
    handleViews();
  }, [id]);

  return (
    <div className="view-container">
      {totalViews === 0 ? (
        <Skeleton className="view_skeleton" />
      ) : (
        <>
          <div className="absolute -top-2 -right-2">
            <Ping />
          </div>
          <p className="view-text">
            <span className="font-black">
              {totalViews > 1 ? `${totalViews} views` : `${totalViews} view`}
            </span>
          </p>
        </>
      )}
    </div>
  );
};
export default View;

"use client";

import Ping from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { useEffect, useState, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const View = ({ id }: { id: string }) => {
  const [totalViews, setTotalViews] = useState(0);
  const [fetchState, setsetFetchState] = useState<
    "idle" | "loading" | "success" | "error"
  >("loading");
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const handleViews = async () => {
      try {
        // POST to increment
        const res = await fetch(`/api/views/${id}`, { method: "POST" });

        if(!res.ok) throw new Error();

        // then fetch updated count
        const data = await client
          .withConfig({ useCdn: false })
          .fetch(STARTUP_VIEWS_QUERY, { id });

        setTotalViews(data.views);
        setsetFetchState("success");
      } catch (error) {
        console.error("Failed to update views:", error);
        setsetFetchState("error");
      }
    };
    handleViews();
  }, [id]);

  return (
    <div className="view-container">
      {fetchState === "loading" ? (
        <Skeleton className="view_skeleton" />
      ) : (
        <>
          <div className="absolute -top-2 -right-2">
            <Ping />
          </div>
          <p className="view-text">
            <span className="font-black">
              {fetchState === "error"
                ? "error"
                : totalViews > 1
                  ? `${totalViews} views`
                  : `${totalViews} view`}
            </span>
          </p>
        </>
      )}
    </div>
  );
};
export default View;

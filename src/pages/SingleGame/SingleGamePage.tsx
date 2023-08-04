"use client";

import { fetchData } from "@/lib/queries";
import { gameSlugToId } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

function SingleGamePage() {
  const { slug } = (useParams() as { slug: string }) || {};

  const game = useQuery({
    queryKey: ["game"],
    queryFn: () => {
      return fetchData(`/api/games/${gameSlugToId[slug as string]}`);
    },
  });

  return <div>SingleGamePage {game.data?.title}</div>;
}

export default SingleGamePage;

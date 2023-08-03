import SingleGamePage from "@/pages/SingleGamePage/SingleGamePage";
import { gameSlugToTitle } from "@/lib/types";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  return {
    title: `Mini Games: ${gameSlugToTitle[params.slug]}`,
  };
}

function GamePage() {
  //get id from params

  return <SingleGamePage />;
}

export default GamePage;

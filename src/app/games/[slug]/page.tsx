import SingleGamePage from "@/pages/SingleGame/SingleGamePage";
import { gameSlugToTitle } from "@/lib/types";

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
  return <SingleGamePage />;
}

export default GamePage;

import { fetchData } from "@/lib/queries";
import { GameDoc } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ChooseAGame, GameOption, GameOptions } from "./Header.styles";
import Image from "next/image";
import dropdownArrow from "./dropdownArrow.svg";

function GamesListDropdown() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const games = useQuery({
    queryKey: ["games"],
    queryFn: () => {
      return fetchData("/api/games");
    },
  });

  return (
    <ChooseAGame
      onClick={() => {
        setIsMenuOpen(!isMenuOpen);
      }}
    >
      <span>Choose a Game:</span>
      <Image src={dropdownArrow} alt="" height={12} width={12} />
      <GameOptions $isMenuOpen={isMenuOpen}>
        {games.data?.map((game: GameDoc) => (
          <GameOption key={game.id} href={`/games/${game.slug}`}>
            <div>{game.title}</div>
          </GameOption>
        ))}
      </GameOptions>
    </ChooseAGame>
  );
}

export default GamesListDropdown;

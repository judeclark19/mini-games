import { fetchData } from "@/lib/queries";
import { GameDoc } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { ChooseAGame, GameOption, GameOptions } from "./Header.styles";
import Image from "next/image";
import dropdownArrow from "./dropdownArrow.svg";

function GamesListDropdown() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const games = useQuery({
    queryKey: ["games"],
    queryFn: () => {
      return fetchData("/api/games");
    },
  });

  useEffect(() => {
    if (!isMenuOpen) return; // Only set up the listener if the menu is open

    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false); // Close the menu if the click was outside
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      // Cleanup - remove the listener when the menu is closed or the component unmounts
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <ChooseAGame
      $isMenuOpen={isMenuOpen}
      onClick={() => {
        setIsMenuOpen(!isMenuOpen);
      }}
      ref={menuRef}
    >
      <span>Choose a Game:</span>
      <Image src={dropdownArrow} alt="" height={12} width={12} />
      <GameOptions $isMenuOpen={isMenuOpen} $numOfGames={games.data?.length}>
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

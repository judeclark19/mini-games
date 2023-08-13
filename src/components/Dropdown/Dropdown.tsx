import { GameOption } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownOption,
  DropdownOptions,
} from "./Dropdown.styles";
import Image from "next/image";
import dropdownArrow from "./dropdownArrow.svg";

function Dropdown({
  data,
  promptText,
}: {
  data: GameOption[];
  promptText: JSX.Element;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

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
    <DropdownMenu
      $isMenuOpen={isMenuOpen}
      onClick={() => {
        setIsMenuOpen(!isMenuOpen);
      }}
      ref={menuRef}
    >
      <div
        style={{
          marginRight: "2rem",
        }}
      >
        {promptText}
      </div>
      <Image src={dropdownArrow} alt="" height={12} width={12} />
      <DropdownOptions $isMenuOpen={isMenuOpen} $numOfOptions={data?.length}>
        {data?.map((item: GameOption) => (
          <DropdownOption key={item.id} href={item.href}>
            <div>{item.title}</div>
          </DropdownOption>
        ))}
      </DropdownOptions>
    </DropdownMenu>
  );
}

export default Dropdown;

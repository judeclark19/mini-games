import Link from "next/link";
import styled from "styled-components";

export const DropdownButton = styled.div<{
  $isMenuOpen: boolean;
}>`
  position: relative;
  padding: 0.5rem;
  width: 210px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    transform: ${({ $isMenuOpen }) =>
      !$isMenuOpen ? "rotate(180deg)" : "none"};
    transition: all 0.3s ease-in-out;
  }
`;

export const DropdownOptions = styled.div<{
  $isMenuOpen: boolean;
  $numOfOptions: number;
}>`
  height: ${({ $isMenuOpen, $numOfOptions }) =>
    $isMenuOpen ? `${40 * $numOfOptions}px` : "0px"};
  width: 100%;
  padding: ${({ $isMenuOpen }) => ($isMenuOpen ? "0.5rem" : "0px")};
  overflow-y: hidden;
  transition: all 0.3s ease-in-out;
  position: absolute;
  border: ${({ $isMenuOpen }) =>
    $isMenuOpen ? "none" : "1px solid var(--blue-tang)"};
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: var(--blue-tang);
  top: 2rem;
  left: 0;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  box-shadow: ${({ $isMenuOpen }) =>
    $isMenuOpen ? "0 0px 4px rgba(0, 0, 0, 0.7)" : "none"};
`;

export const DropdownOption = styled(Link)`
  padding: 5px;
  border-radius: 2px;

  &:hover {
    background-color: var(--bundaberg-sand);
    color: var(--white);
    text-shadow: 0 0px 4px rgba(0, 0, 0, 0.7);
  }
`;

import Link from "next/link";
import styled from "styled-components";

export const DropdownMenu = styled.div<{
  $isMenuOpen: boolean;
}>`
  position: relative;
  padding: 0.5rem;

  width: max-content;
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
  max-height: ${({ $isMenuOpen }) =>
    $isMenuOpen ? "500px" : "0px"}; // Adjust the max-height as needed
  width: 100%;
  padding: ${({ $isMenuOpen }) => ($isMenuOpen ? "0.5rem" : "0px")};
  overflow-y: hidden;
  transition: all 0.3s ease-in-out;
  position: absolute;

  border-radius: 0 0 0.5rem 0.5rem;
  background-color: var(--blue);
  top: 2.5rem;
  left: 0;

  opacity: ${({ $isMenuOpen }) => ($isMenuOpen ? "1" : "0")};
  visibility: ${({ $isMenuOpen }) => ($isMenuOpen ? "visible" : "hidden")};

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  transform: ${({ $isMenuOpen }) =>
    $isMenuOpen ? "translateY(0)" : "translateY(-10px)"};

  box-shadow: ${({ $isMenuOpen }) =>
    $isMenuOpen ? "0 0px 4px white" : "none"};
`;

export const DropdownOption = styled(Link)`
  padding: 5px;
  border-radius: 2px;

  &:hover {
    background-color: var(--orange);
    color: var(--white);
    font-weight: 700;
    text-shadow: 0 0px 4px rgba(0, 0, 0, 0.7);
  }
`;

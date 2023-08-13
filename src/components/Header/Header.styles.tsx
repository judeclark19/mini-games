import styled from "styled-components";
import Link from "next/link";

export const StyledHeader = styled.header`
  color: var(--white);
  width: 100vw;
  padding: 2rem;
`;

export const HeaderContent = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderLeft = styled.div`
  h3 {
    color: var(--aurichalcite);
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

export const LoggedInUser = styled.div`
  span {
    color: var(--aurichalcite);
  }

  a {
    color: var(--bundaberg-sand);

    &:hover {
      text-decoration: underline;
    }
  }

  span,
  a {
    font-weight: 700;
    font-size: 1.1rem;
  }
`;

export const ChooseAGame = styled.div<{
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

export const GameOptions = styled.div<{
  $isMenuOpen: boolean;
  $numOfGames: number;
}>`
  height: ${(props) =>
    props.$isMenuOpen ? `${40 * props.$numOfGames}px` : "0px"};
  width: 100%;
  padding: ${(props) => (props.$isMenuOpen ? "0.5rem" : "0px")};
  overflow-y: hidden;
  transition: all 0.3s ease-in-out;
  position: absolute;
  border: ${(props) =>
    props.$isMenuOpen ? "none" : "1px solid var(--blue-tang)"};
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: var(--blue-tang);
  top: 2rem;
  left: 0;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  box-shadow: ${(props) =>
    props.$isMenuOpen ? "0 0px 4px rgba(0, 0, 0, 0.7)" : "none"};
`;

export const GameOption = styled(Link)`
  padding: 5px;
  border-radius: 2px;

  &:hover {
    background-color: var(--bundaberg-sand);
    color: var(--white);
    text-shadow: 0 0px 4px rgba(0, 0, 0, 0.7);
  }
`;

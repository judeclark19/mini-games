import styled from "styled-components";
import Link from "next/link";

export const StyledHeader = styled.header`
  color: var(--white);

  background-color: var(--monet-moonrise);
  color: var(--blueblood);
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

export const HeaderLeft = styled.div``;

export const HeaderRight = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

export const LoggedInUser = styled.div`
  span {
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--bright-orange);
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
}>`
  height: ${(props) => (props.$isMenuOpen ? "180px" : "0px")};
  width: 200px;
  padding: ${(props) => (props.$isMenuOpen ? "0.5rem" : "0px")};

  overflow-y: auto;
  transition: all 0.3s ease-in-out;
  position: absolute;
  /* border: 1px solid rgba(255, 255, 255, 0.5); */
  border: ${(props) => (props.$isMenuOpen ? "1px solid var(--white)" : "none")};
  /* background-color: var(--jazz-blue); */
  background-color: var(--monet-moonrise);
  top: 2rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.7);
`;

export const GameOption = styled(Link)`
  padding: 5px;

  &:hover {
    background-color: var(--bright-orange);
    color: var(--white);
    text-shadow: 0 0px 4px rgba(0, 0, 0, 0.7);
  }
`;

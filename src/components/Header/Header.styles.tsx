import styled from "styled-components";
import Link from "next/link";

export const StyledHeader = styled.header`
  color: var(--white);
  background-color: var(--blueblood);
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

export const LoginButton = styled.button`
  background-color: var(--jazz-blue);
  color: white;
  padding: 0.5rem;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 1rem;

  &:hover {
    background-color: var(--bright-orange);
    border: 2px solid var(--shrimp-toast);
    scale: 1.06;

    text-shadow: 0 0px 4px rgba(0, 0, 0, 0.7);
  }
`;

export const ChooseAGame = styled.div`
  position: relative;
  padding: 0.5rem;
  width: 210px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    transform: rotate(180deg);
  }
`;

export const GameOptions = styled.div<{
  $isMenuOpen: boolean;
}>`
  height: ${(props) => (props.$isMenuOpen ? "170px" : "0px")};
  width: 200px;
  padding: ${(props) => (props.$isMenuOpen ? "0.5rem" : "0px")};

  overflow-y: auto;
  transition: all 0.3s ease-in-out;
  position: absolute;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background-color: var(--jazz-blue);
  border-radius: 0.5rem;
  top: 2rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.7);
`;

export const GameOption = styled(Link)`
  padding: 5px;
  border-radius: 4px;
  &:hover {
    background-color: var(--bright-orange);
    text-shadow: 0 0px 4px rgba(0, 0, 0, 0.7);
  }
`;

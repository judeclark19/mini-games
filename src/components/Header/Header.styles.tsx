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
    color: var(--blue);
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

export const LoggedInUser = styled.div<{
  $isLoggedIn: boolean;
}>`
  span {
    color: ${({ $isLoggedIn }) =>
      $isLoggedIn ? "var(--blue)" : "var(--orange)"};
    font-weight: 700;
    font-size: 1.1rem;
  }
`;

"use client";

import styled from "styled-components";

const StyledFooter = styled.footer`
  color: var(--white);
  width: 100vw;
  padding: 2rem;
  text-align: center;

  a {
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--orange);

    &:hover {
      text-decoration: underline;
    }
  }
`;

function Footer() {
  return (
    <StyledFooter>
      Created by <a href="https://github.com/judeclark19">Jude Clark</a> |{" "}
      <a href="https://github.com/judeclark19/mini-games">
        View Github Repository
      </a>
    </StyledFooter>
  );
}

export default Footer;

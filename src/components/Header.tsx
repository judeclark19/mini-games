"use client";

import { User } from "firebase/auth";
import styled from "styled-components";

const StyledHeader = styled.h1`
  color: red;
`;

function Header({ loggedInUser }: { loggedInUser: User | null }) {
  return (
    <>
      {loggedInUser && (
        <StyledHeader>Logged in as {loggedInUser.email}</StyledHeader>
      )}
    </>
  );
}

export default Header;

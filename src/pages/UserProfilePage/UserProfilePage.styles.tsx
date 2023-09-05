import styled from "styled-components";

export const PageTitle = styled.h1`
  margin-bottom: 2rem;
`;

export const PageWrapper = styled.div`
    max-width: var(--max-width);
    min-width: 600px;
    display: flex;
    flex-direction: column;
    
    `
export const PageContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5rem;`


export const UserInfo = styled.div`
    display: flex;
    gap: 3rem;

    font-size: 1.2rem;

`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  line-height: 1.5rem;
  flex-basis: 50%;
  width: max-content;
`;

export const Label = styled.div`
    opacity: 0.75;
`

export const Value = styled.div`
    font-weight: 700;
    color: var(--light-blue);
`

export const Underline = styled.div`
  height: 3px;
  width: 100%;
  background-color: var(--orange);
`;

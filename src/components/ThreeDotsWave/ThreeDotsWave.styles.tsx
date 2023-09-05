import styled, { keyframes } from "styled-components";

// @keyframes bounce {
//     0% {
//       transform: translateY(0);
//     }
//     50% {
//       transform: translateY(100%);
//     }
//     100% {
//       transform: translateY(0);
//     }
//   }

const bounce = keyframes`
     0% {
       transform: translateY(0);
     }
     50% {
       transform: translateY(100%);
     }
     100% {
       transform: translateY(0);
     }
`;

export const DotsContainer = styled.div`
  display: flex;
  height: 1.5rem;
  width: 2.25rem;
  justify-content: space-between;
`;

export const LoadingDot = styled.span<{ delay: string; }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: var(--yellow);
  animation-name: ${bounce};
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-delay: ${(props) => props.delay || '0s'};
`;

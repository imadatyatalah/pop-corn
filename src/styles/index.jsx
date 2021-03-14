import { css } from "@emotion/react";
import NextImage from "next/image";
import styled from "@emotion/styled";

export const StyledNextImage = styled(NextImage)`
  border-radius: 0.375rem;
`;

export const TagLine = styled.i`
  font-weight: 300;
`;

export const Title = styled.strong`
  font-weight: 600;
`;

export const InfoCardStyles = css`
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  @supports not (backdrop-filter: none) {
    backdrop-filter: none;
    background: rgba(255, 255, 255, 1); /* Opacity 100% */
  }
`;

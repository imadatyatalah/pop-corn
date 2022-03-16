import Image from "next/image";

import styled from "@emotion/styled";
import { PropsOf } from "@emotion/react";

const StyledMediaFallBack = styled(Image)`
  opacity: 50%;
`;

type Props = PropsOf<typeof StyledMediaFallBack>;

export const PosterFallBack = (props: Props) => (
  <StyledMediaFallBack
    {...props}
    src="/image.svg"
    width="342"
    height="513"
    alt="image-icon ionicons ionicons-icon"
    quality="50"
  />
);

export const ProfileFallBack = (props: Props) => (
  <StyledMediaFallBack
    {...props}
    src="/person-sharp.svg"
    width="342"
    height="513"
    alt="person-sharp-icon ionicons ionicons-icon"
    quality="50"
  />
);

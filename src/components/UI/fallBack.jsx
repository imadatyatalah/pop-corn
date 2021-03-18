import { StyledPosterFallBack } from "./styles/fallBack.styles";

export const PosterFallBack = (props) => (
  <>
    <StyledPosterFallBack
      src="/image.svg"
      width="342"
      height="513"
      alt="image-icon ionicons ionicons-icon"
      quality="50"
      {...props}
    />
  </>
);

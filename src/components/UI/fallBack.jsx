import { StyledMediaFallBack } from "./styles/fallBack.styles";

export const PosterFallBack = (props) => (
  <>
    <StyledMediaFallBack
      src="/image.svg"
      width="342"
      height="513"
      alt="image-icon ionicons ionicons-icon"
      quality="50"
      {...props}
    />
  </>
);

export const ProfileFallBack = (props) => (
  <>
    <StyledMediaFallBack
      src="/person-sharp.svg"
      width="342"
      height="513"
      alt="person-sharp-icon ionicons ionicons-icon"
      quality="50"
      {...props}
    />
  </>
);

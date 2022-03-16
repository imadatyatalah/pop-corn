import { Box } from "@chakra-ui/react";

import { IMAGE_BASE_URL, MAX_WIDTH, MD_BACKDROP_SIZE } from "config";

interface Props {
  backdropPath: string;
  children: React.ReactNode;
}

const Backdrop = ({ backdropPath, children }: Props) => (
  <Box
    as="section"
    bgImage={`linear-gradient(to top, rgba(21,94,117,1) 0%, rgba(21,94,117,0) 100%), url(${`${IMAGE_BASE_URL}${MD_BACKDROP_SIZE}${backdropPath}`})`}
    bgPosition="center"
    bgRepeat="no-repeat"
    bgSize="cover"
    maxW={MAX_WIDTH}
    mx="auto"
    px={[4, 8, 12, 16, 20]}
  >
    {children}
  </Box>
);

export default Backdrop;

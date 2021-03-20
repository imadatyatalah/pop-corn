import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { IMAGE_BASE_URL, MAX_WIDTH, MD_BACKDROP_SIZE } from "../../../config";

const Backdrop = ({ backdropPath, children }) => {
  return (
    <>
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
    </>
  );
};

Backdrop.propTypes = {
  backdropPath: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Backdrop;

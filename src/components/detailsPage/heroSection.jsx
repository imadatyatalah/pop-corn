import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { IMAGE_BASE_URL, LG_POSTER_SIZE } from "../../../config";
import { StyledNextImage } from "../../styles";
import Backdrop from "./backdrop";
import InfoCard from "./infoCard";

const DetailsPage = ({ data }) => {
  return (
    <>
      <Backdrop backdropPath={data.backdrop_path}>
        <Box
          d="flex"
          justifyContent={{ base: "center", lg: "flex-start" }}
          flexDir={{ base: "column", lg: "row" }}
          py={{ base: "3rem", lg: "2rem" }}
        >
          <Box d="flex" alignSelf="center" shadow="2xl">
            <StyledNextImage
              src={`${IMAGE_BASE_URL}${LG_POSTER_SIZE}${data.poster_path}`}
              width="342"
              height="513"
              alt={data.title}
              layout="fixed"
            />
          </Box>
          <InfoCard data={data} />
        </Box>
      </Backdrop>
    </>
  );
};

DetailsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DetailsPage;

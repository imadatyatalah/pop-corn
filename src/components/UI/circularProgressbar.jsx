import { Box, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const pathColor = (value) => {
  if (value > 0 && value < 33.33) {
    // Red
    return "#ef233c";
  } else if (value > 3.3 && value < 66.66) {
    // Yellow
    return "#ffd000";
  } else if (value > 66.66) {
    // Green
    return "#21d07a";
  }
};

const CircularProgressbar = ({ value, size, fontSize, ...props }) => {
  const result = Math.round((value * 100) / 10);

  return (
    <>
      <Box {...props}>
        <CircularProgress
          aria-label={`vote average: ${result}%`}
          size={size}
          max="10"
          bgColor="#27272A"
          rounded="full"
          boxShadow="lg"
          value={value}
          thickness="8px"
          trackColor="#4e4e69"
          color={pathColor(result)}
        >
          <CircularProgressLabel
            color="white"
            fontSize={fontSize}
            fontWeight="600"
          >
            {value !== 0 ? `${result}%` : "NR"}
          </CircularProgressLabel>
        </CircularProgress>
      </Box>
    </>
  );
};

export default CircularProgressbar;

const PID = () => {
  return <></>;
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { pID: "popular" } },
      { params: { pID: "now_playing" } },
      { params: { pID: "upcoming" } },
      { params: { pID: "top_rated" } },
    ],
    fallback: false,
  };
};

export const getStaticProps = async () => {
  return {
    props: {
      data: null,
    },
  };
};

export default PID;

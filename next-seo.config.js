import config from "config";

const NextSeo = {
  defaultTitle: config.title,
  titleTemplate: `%s - ${config.title}`,

  openGraph: {
    type: "website",
    locale: "en_US",
    url: config.canonical,
    site_name: config.title,
  },
};

export default NextSeo;

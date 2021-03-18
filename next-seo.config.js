import config from "./config";

export default {
  openGraph: {
    type: "website",
    locale: "en_US",
    url: config.canonical,
    site_name: config.title,
  },
};

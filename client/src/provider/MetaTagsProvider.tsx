import SITE_CONFIG from "@/config/site";
import { Helmet } from "react-helmet";

interface IMetaTagsProviderProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string;
  author?: string;
  canonical?: string;
  robots?: "index, follow" | "noindex, nofollow";
  og?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    site_name?: string;
  };
}

const MetaTagsProvider = (props: IMetaTagsProviderProps) => {
  const joinedKeywords = `${SITE_CONFIG?.keywords}${
    props?.keywords ? "," : ""
  }${props.keywords ?? ""}`;
  return (
    <>
      <Helmet>
        <title>{props.title ?? SITE_CONFIG.title}</title>
        <meta
          name="description"
          content={props.description ?? SITE_CONFIG.description}
        />
        <meta name="keywords" content={joinedKeywords} />
        <meta name="author" content={props.author ?? SITE_CONFIG.name} />
        <meta name="robots" content={props.robots ?? "index, follow"} />

        <meta
          property="og:title"
          content={props.og?.title ?? SITE_CONFIG.title}
        />
        <meta
          property="og:description"
          content={props.og?.description ?? SITE_CONFIG.description}
        />
        <meta
          property="og:image"
          content={props.og?.image ?? SITE_CONFIG.image}
        />
        <meta property="og:url" content={props.og?.url} />
        <meta property="og:type" content={props.og?.type} />
        <meta
          property="og:site_name"
          content={props.og?.site_name ?? SITE_CONFIG.name}
        />

        {/* twitter cards */}
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:site"
          content={props.og?.site_name ?? "@bizconnect24"}
        />
        <meta
          name="twitter:title"
          content={props.og?.title ?? "bizconnect24"}
        />
        <meta
          name="twitter:description"
          content={props.og?.description ?? SITE_CONFIG.description}
        />
        <meta
          name="twitter:image"
          content={props.og?.image ?? SITE_CONFIG.image}
        />

        {/* canonical url */}
        {props?.canonical && <link rel="canonical" href={props.canonical} />}

        {/* favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
    </>
  );
};

export default MetaTagsProvider;

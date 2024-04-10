import Head from "next/head";
import { useRouter } from "next/router";

const HeadMeta = ({ meta }) => {
  const router = useRouter();

  return (
    <Head>
      <title>{meta?.title}</title>
      <meta name="robots" content="follow, index" />
      <link
        rel="shortcut icon"
        sizes="16x16 32x32 48x48"
        href={`${process.env.NEXT_PUBLIC_VERCEL_URL}static/logo/favicon.ico`}
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="57x57"
        href={`${process.env.NEXT_PUBLIC_VERCEL_URL}static/logo/favicon-57.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href={`${process.env.NEXT_PUBLIC_VERCEL_URL}static/logo/favicon-57.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href={`${process.env.NEXT_PUBLIC_VERCEL_URL}static/logo/favicon-57.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href={`${process.env.NEXT_PUBLIC_VERCEL_URL}static/logo/favicon-72.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${process.env.NEXT_PUBLIC_VERCEL_URL}static/logo/favicon-76.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href={`${process.env.NEXT_PUBLIC_VERCEL_URL}static/logo/favicon-114.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href={`${process.env.NEXT_PUBLIC_VERCEL_URL}static/logo/favicon-120.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href={`${process.env.NEXT_PUBLIC_VERCEL_URL}static/logo/favicon-144.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href={`${process.env.NEXT_PUBLIC_VERCEL_URL}static/logo/favicon-152.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${process.env.NEXT_PUBLIC_VERCEL_URL}static/logo/favicon-180.png`}
      />
      <meta content={meta?.description || ""} name="description" />
      <meta
        property="og:url"
        content={`//${process.env.NEXT_PUBLIC_VERCEL_URL}${router.asPath}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={meta?.title} />
      <meta property="og:description" content={meta?.description} />
      <meta property="og:title" content={meta?.title} />
      <meta property="og:image" content={meta?.cardImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@vercel" />
      <meta name="twitter:title" content={meta?.title} />
      <meta name="twitter:description" content={meta?.description} />
      <meta name="twitter:image" content={meta?.cardImage} />
    </Head>
  );
};

export default HeadMeta;

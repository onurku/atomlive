import { Analytics } from "@vercel/analytics/react";

import { Children } from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@mui/styles";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="google-site-verification"
            content="Sqme4d5bZNCMrTXKcdgwmyj5J4DJOQ0RumU5n3ESy-g"
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-VJPVXPNPW7"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'G-VJPVXPNPW7', {
                                page_path: window.location.pathname,
                                });
                            `
            }}
          />
        </Head>
        <body className="loading">
          <div id="modal-root"></div>
          <Main />
          <NextScript />
          <Analytics />
        </body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            _linkedin_partner_id = "5758642";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          </script>
          <script type="text/javascript">
            (function(l) {
            if (!l){window.lintrk = function (a, b) { window.lintrk.q.push([a, b]) }
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);})(window.lintrk);
          </script>
          <noscript>
            <img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=5758642&fmt=gif" />
          </noscript>`
          }}
        />
      </Html>
    );
  }
}

export default MyDocument;

// Why we add the code below:
// https://itnext.io/next-js-with-material-ui-7a7f6485f671
// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...Children.toArray(initialProps.styles), sheets.getStyleElement()]
  };
};
//////////

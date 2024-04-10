import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

//Library components
import { browserName, browserVersion } from "react-device-detect";
import { createStyles, makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// app components
import BookLayout from "@/components/layouts/BookLayout";
import NoSsr from "@/components/ui/NoSsr";
import { getData } from "@/utils/helpers";
import LoadingDots from "@/components/ui/LoadingDots";
import { useContent } from "@/components/hooks/useContent";

const HostMainframe = dynamic(
  () => import("@/components/ui/LiveStreaming/HostMainframe"),
  {
    ssr: false
  }
);

const styles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "block"
    }
  })
);

function Stage() {
  const classes = styles();

  const router = useRouter();
  const { bookStageSlug } = router.query;
  const [data, setData] = useState();

  const { status, data: sessionData } = useSession();
  const { arContent } = useContent({ title: bookStageSlug });

  useEffect(async () => {
    let bookData;

    let mounted = true;
    console.log("status bookstageslug", status, sessionData);
    if (mounted && bookStageSlug) {
      if (status === "authenticated") {
        const response = await getData(`/api/content/${bookStageSlug}`);
        bookData = response.data;
        setData(bookData);
      } else if (status === "unauthenticated") {
        router.push(`/sign/in?redirect=/books/in/stage/${bookStageSlug}`);
      }
    }

    return () => {
      mounted = false;
    };
  }, [bookStageSlug, setData, status]);

  return (
    <>
      <NoSsr>
        {!(
          browserName.toLowerCase().includes("chrome") ||
          browserName.toLowerCase().includes("firefox") ||
          (browserName.toLowerCase().includes("safari") &&
            parseFloat(browserVersion) >= 14.5)
        ) && (
          <Grid container align="center" justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="body1">
                This page works only on Chrome, Firefox or Safari 14.5+. You are
                using {browserName} {browserVersion}.
              </Typography>
            </Grid>
          </Grid>
        )}
        {(browserName.toLowerCase().includes("chrome") ||
          browserName.toLowerCase().includes("firefox") ||
          (browserName.toLowerCase().includes("safari") &&
            parseFloat(browserVersion) >= 14.5)) &&
          sessionData && (
            <div suppressHydrationWarning={true}>
              {data && <HostMainframe slug={bookStageSlug} />}
              {!data && (
                <Stack
                  sx={{
                    minHeight: "100vh",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <LoadingDots />
                  <Typography variant="h3">
                    We're loading book content
                  </Typography>
                </Stack>
              )}
            </div>
          )}
      </NoSsr>
    </>
  );
}

Stage.layout = BookLayout;

export default Stage;

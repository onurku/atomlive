import { useEffect, useReducer } from "react";
// import "@/assets/main.css";
import "@/assets/reset.css";
import "@/assets/t-global.css";

import Layout from "@/components/Layout";
import UserContext from "@/components/contexts/UserContext";
import monochrome from "@/components/styles/monochrome";
import { UserContextProvider } from "@/utils/useUser";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}) {
  const CustomLayout = Component.layout || Layout;

  useEffect(() => {
    //document.body.classList?.remove("loading");
    // Why we add the code below:
    // https://itnext.io/next-js-with-material-ui-7a7f6485f671
    // Remove the server-side injected CSS.

    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    //////////
  }, []);

  function reducer(state, userProfile) {
    const newUser = { ...state, ...userProfile };
    if (localStorage) {
      localStorage.setItem("user", JSON.stringify(newUser));
    }
    return newUser;
  }

  const [user, setUser] = useReducer(reducer, {});

  return (
    <div className="bg-primary">
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <ThemeProvider theme={monochrome}>
          <UserContextProvider>
            {/* api side side */}
            <UserContext.Provider value={[user, setUser]}>
              {/* client side */}
              <CustomLayout>
                <Component {...pageProps} />
              </CustomLayout>
            </UserContext.Provider>
          </UserContextProvider>
        </ThemeProvider>
      </SessionProvider>
    </div>
  );
}

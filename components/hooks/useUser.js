import { useState, useEffect } from "react";
import { getData } from "@/utils/helpers/";

let localCache = {};

async function requestUserDetails() {
  try {
    localCache["user"] = await getData(`/api/account/profile`);
    if (window && localStorage) {
      localStorage.setItem("last_updated_user", new Date());
      localStorage.setItem("user", JSON.stringify(localCache["user"]));
    }
  } catch (error) {
    // ignore
    console.error("error", error);
  }
  return localCache["user"];
}

export function useUserDetails() {
  const [userDetails, setUserDetails] = useState();
  const [userStatus, setStatus] = useState("unloaded"); //unloaded, loading, loaded

  useEffect(async () => {
    let localUserDetails = localStorage.getItem("user");

    if (localCache["user"]) {
      console.log("has local cache user");
      setUserDetails(localCache["user"]);
    } else if (
      typeof localUserDetails === "string" ||
      localUserDetails instanceof String
    ) {
      localUserDetails = JSON.parse(localUserDetails);
      setUserDetails(localUserDetails);
    } else {
      setStatus("loading");
      await requestUserDetails();
      setUserDetails(localCache["user"]);
    }
    setStatus("loaded");
  }, [setUserDetails]);
  return { userDetails, setUserDetails, userStatus };
}

export function useUpdateUser(user) {
  const [userDetails, setUserDetails] = useState();
  const [userStatus, setStatus] = useState("unloaded"); //unloaded, loading, loaded

  useEffect(async () => {
    let localUserDetails = localStorage.getItem("user");
    if (localUserDetails) {
      localUserDetails = JSON.parse(localUserDetails);

      const lastUpdatedUser = localStorage.getItem("last_updated_user");
      setUserDetails(localUserDetails);
    } else {
      setStatus("loading");
      await requestUserDetails();
      setUserDetails(() => localCache["user"]);
    }
    setStatus("loaded");
  }, [user]);

  return {
    userDetails
  };
}

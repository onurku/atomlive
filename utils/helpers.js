import { responsiveFontSizes } from "@mui/material";
import { signOut } from "next-auth/react";
import Router from "next/router";

export const getURL = () => {
  const url =
    process?.env?.URL && process.env.URL !== ""
      ? process.env.URL
      : process?.env?.VERCEL_URL && process.env.VERCEL_URL !== ""
      ? process.env.VERCEL_URL
      : "http://localhost:3000";
  return url.includes("http") ? url : `https://${url}`;
};

export const getData = async (url) => {
  const res = await fetch(url, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      "User-Agent": "*"
    }),
    credentials: "same-origin"
  });

  if (res?.ok) {
    const dataResponse = (await res.json()) || {}; // {} if no network, prevents browser crash
    console.log("response", res, dataResponse);
    if (Object.keys(dataResponse).length === 0) {
      return {
        success: false,
        status: res.status
      };
    }
    return dataResponse;
  }
  return {
    success: false,
    status: res.status
  };
};

export const postData = async ({ url, data = {} }) => {
  const res = await fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(data)
  });
  const dataResponse = (await res.json()) || {};
  console.log("postData", dataResponse);

  return dataResponse;
};

export const patchData = async ({ url, data = {} }) => {
  const res = await fetch(url, {
    method: "PATCH",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(data ? data : {})
  });

  if (res.ok) {
    const dataResponse = (await res.json()) || {};

    if (Object.keys(dataResponse).length === 0) {
      return {
        success: false,
        error: true,
        status: res.status
      };
    }

    return dataResponse;
  }

  //if !res.ok
  return {
    ...dataResponse,
    success: false,
    status: res.status
  };
};

export const deleteData = async ({ url, token, data = {} }) => {
  const res = await fetch(url, {
    method: "DELETE",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
    body: JSON.stringify(data)
  });

  if (res.ok) {
    const dataResponse = (await res.json()) || {};

    if (Object.keys(dataResponse).length === 0) {
      return {
        success: false,
        status: res.status
      };
    }
    return dataResponse;
  }

  //if !res.ok
  return {
    ...dataResponse,
    success: false,
    status: res.status
  };
};

export const toDateTime = (secs) => {
  var t = new Date("1970-01-01T00:30:00Z"); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

export const handleSignOut = (session, url) => (e) => {
  const localItems = ["user", "stripe", "cart"];

  if (localStorage) {
    localItems.map((item) => {
      if (localStorage.getItem(item)) {
        console.log("localstorage remove:", item);
        localStorage.removeItem(item);
      }
    });
  }

  if (url) {
    signOut({ callbackUrl: url, ...session });
  } else {
    signOut(session);
  }

  return;
};

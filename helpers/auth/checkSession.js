import { getSession } from "next-auth/react";

export default async function checkSession(req, res) {
  const session = await getSession({ req });

  if (session) {
    // Signed in
    console.log("Session", JSON.stringify(session, null, 2));
    return true;
  } else {
    // Not Signed in
    res.status(401).json("Email Not Authenticated");
    res.end();
    return false;
  }
}

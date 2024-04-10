import {
  RtcTokenBuilder,
  RtmTokenBuilder,
  RtcRole,
  RtmRole
} from "agora-access-token";

const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const APP_CERTIFICATE = process.env.NEXT_PUBLIC_APP_CERTIFICATE;
const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL;

export const retrieveAgoraToken = (props) => {
  ///////////////////
  const { uid, channel, role } = props || {};

  const channelName = channel || "Test";

  let roleAgora;
  if (role === "host") {
    roleAgora = RtcRole.PUBLISHER;
  } else if (role === "admin") {
    roleAgora = RtcRole.ADMIN;
  }

  const expirationTimeInSeconds = 360000;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

  // Build token with uid
  const tokenA = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channel,
    uid,
    roleAgora,
    privilegeExpiredTs
  );

  //////////////////

  return tokenA;
};

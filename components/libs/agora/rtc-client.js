import { useEffect } from "react";
import { retrieveAgoraToken } from "./retrieve-token";

const BASEURL = process.env.NEXT_PUBLIC_VERCEL_URL;
const TOKEN = process.env.NEXT_PUBLIC_CLIENT_TOKEN_1;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const VIDEO_WIDTH = "1280px";
const VIDEO_HEIGHT = "720px";

const options = {
  // Pass your app ID here.
  appId: process.env.NEXT_PUBLIC_APP_ID,
  // Set the channel name.
  channel: "demo_channel_name",
  // Pass a token if your project enables the App Certificate.
  token: null,
  uid: 101,
  role: "host"
};

let rtc = {
  // For the local client.
  client: null,
  // For the local audio and video tracks.
  localAudioTrack: null,
  localVideoTrack: null
};

//options.token = retrieveAgoraToken(options);
let Banuba, AgoraRTC;
export const AgoraVideoCall = async (
  AgoraImport,
  BanubaImport,
  channel,
  uid
) => {
  if (!AgoraRTC) {
    //AgoraRTC = await import("@/components/sdk/agbnb");
    //AgoraRTC = await import("@/components/sdk/AgoraRTC_N-4.7.2");
    AgoraRTC = await import("agora-rtc-sdk-ng");
  }
  if (!Banuba) {
    Banuba = await import("@/components/sdk/BanubaSDK");
  }

  if (AgoraRTC && Banuba) {
    initClientSettings(channel, uid);
    generateStream();

    //init Agora user events
    initClientEvents();
    initAgoraRtcEvents();
  }
};

async function initClientSettings(channel, uid) {
  options.channel = channel;
  options.uid = uid;
  options.token = retrieveAgoraToken(options);
  rtc.client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "h264"
  });
  // console.log("client from SDK", client);
  console.log("========localStream rtc.client ======", rtc.client);

  //await rtc.client.join(APP_ID, options.channel, options.token, options.uid);
  await rtc.client.join(APP_ID, options.channel, options.token, options.uid);
  console.log(
    "========joined ========localStream rtc.client ======",
    rtc.client
  );
  rtc.client.enableAudioVolumeIndicator();
}

async function generateStream() {
  // #region Banuba Web AR SDK and Agora Web SDK integration
  console.log("=============generateStream==============");
  const { MediaStreamCapture, Player } = Banuba;
  const arPlayer = await Player.create({
    clientToken: TOKEN,
    locateFile: {
      "BanubaSDK.wasm": `${BASEURL}/webar/BanubaSDK.wasm`,
      "BanubaSDK.data": `${BASEURL}/webar/BanubaSDK.data`
    }
  });

  //local player
  const arStream = new MediaStreamCapture(arPlayer);
  const arVideo = await AgoraRTC.createCustomVideoTrack({
    mediaStreamTrack: arStream.getVideoTrack()
  });
  const arAudio = await AgoraRTC.createMicrophoneAudioTrack();
  //publish audio and video onto remote stream
  await rtc.client.publish([arAudio, arVideo]);
  console.log("stream published");
  // #endregion
}

function initClientEvents() {
  console.log("initClientEvents");
  const adjustParticipantsView = async (status) => {
    console.log("adjustParticipantsView user", status);
    // const usersCount = rtc.client.remoteUsers.length;
    // const columnsCount = Math.ceil(Math.sqrt(usersCount));
  };
  rtc.client.on("volume-indicator", (volumes) => {
    volumes.forEach((volume, index) => {
      console.log(`${index} UID ${volume.uid} Level ${volume.level}`);
    });
  });
  rtc.client.on("user-published", async (user, mediaType) => {
    // Subscribe to a remote user.
    console.log("user published event", user, mediaType);
    await rtc.client.subscribe(user, mediaType);
    console.log("subscribe success");

    const attendeeContainer = document.getElementById("user-published");
    if (mediaType === "video") {
      user.videoTrack.play(attendeeContainer);
    }
    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  });

  rtc.client.on("user-unpublished", async (user, mediaType) => {
    console.log("user-unpublished");
    rtc.client.unsubscribe(user, mediaType);
  });

  rtc.client.on("connection-state-changed", async (state) => {
    console.log("connection-state-changed, STATE", state);
  });

  rtc.client.on("user-joined", adjustParticipantsView("user-joined"));
  rtc.client.on("user-left", adjustParticipantsView("user-left"));
  // When token-privilege-will-expire occurs, fetch a new token from the server and call renewToken to renew the token.

  rtc.client.on("token-privilege-will-expire", async function () {
    let token = await retrieveAgoraToken(options.uid, options.channel, 1);
    console.log("token will expire, retrieving new token", token);
    await rtc.client.renewToken(token);
  });

  // When token-privilege-did-expire occurs, fetch a new token from the server and call join to rejoin the channel.
  rtc.client.on("token-privilege-did-expire", async function () {
    console.log("Fetching the new Token");
    let token = await retrieveAgoraToken(uid, options.channel, 1);
    console.log("Rejoining the channel with new Token", token);
    await rtc.client.join(APP_ID, options.channel, otions.token, options.uid);
  });

  rtc.client.on("user-info-updated", async function (uid, message) {
    console.log("user-info-updated", uid, message);
  });

  rtc.client.on("media-reconnect-start", async function () {
    console.log("media-reconnect-start");
  });

  rtc.client.on("media-reconnect-end", async function () {
    console.log("media-reconnect-end");
  });

  rtc.client.on("stream-type-changed", async function (uid, streamType) {
    console.log("stream-type-changed", uid, streamType);
  });
}

function initAgoraRtcEvents() {
  AgoraRTC.onPlaybackDeviceChanged = (info) => {
    console.log("speaker changed!", info.state, info.device);
  };

  AgoraRTC.onMicrophoneChanged = (info) => {
    console.log("microphone changed!", info.state, info.device);
  };
  AgoraRTC.onCameraChanged = (info) => {
    console.log("camera changed!", info.state, info.device);
  };

  //true = skip permissions for devices
  //   getMicrophones(true).then((microphones) => {
  //     console.log("microphones", microphones);
  //   });

  //   getCameras(true).then((cameras) => {
  //     console.log("cameras", cameras);
  //   });

  AgoraRTC.getDevices()
    .then((devices) => {
      console.log("first devices", devices);
    })
    .catch((e) => {
      console.log("get devices error!", e);
    });

  //areas as defined by Agora, might be useful
  const AREAS = [
    "NORTH_AMERICA",
    "CHINA",
    "EUROPE",
    "GLOBAL",
    "INDIA",
    "JAPAN",
    "OCEANIA",
    "OVERSEA",
    "SOUTH_AMERICA"
  ];
  AgoraRTC.setArea(AREAS[0]);
  //   const audioTrack = await AgoraRTC.createMicrophoneAudioTrack({
  //     microphoneId
  //   });
  //   AgoraRTC.checkAudioTrackIsActive(audioTrack)
  //     .then((result) => {
  //       console.log(
  //         `${microphoneLabel} is ${result ? "available" : "unavailable"}`
  //       );
  //     })
  //     .catch((e) => {
  //       console.log("check audio track error!", e);
  //     });
  //   const videoTrack = await AgoraRTC.createCameraVideoTrack({ cameraId });
  //   AgoraRTC.checkVideoTrackIsActive(videoTrack)
  //     .then((result) => {
  //       console.log(`${cameraLabel} is ${result ? "available" : "unavailable"}`);
  //     })
  //     .catch((e) => {
  //       console.log("check video track error!", e);
  //     });

  //   const videoTrack = await AgoraRTC.createCameraVideoTrack({ cameraId });
  //   AgoraRTC.checkVideoTrackIsActive(videoTrack)
  //     .then((result) => {
  //       console.log(`${cameraLabel} is ${result ? "available" : "unavailable"}`);
  //     })
  //     .catch((e) => {
  //       console.log("check video track error!", e);
  //     });
}

export const AgoraEndEvent = (e) => {
  e.preventDefault();
  console.log("handleEndEvent");
  rtc.client.leave();
};

export const AgoraStartEvent = (e, channel, uid) => {
  e.preventDefault();
  console.log("handlestartEvent");
  //   initClientSettings(channel, uid);
  //   generateStream();
  //   initClientEvents();
};

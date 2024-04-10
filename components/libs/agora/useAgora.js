import { useState, useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import {
  Webcam,
  Player,
  Effect,
  Dom,
  MediaStreamCapture
} from "@/components/sdk/v0.38/BanubaSDK-v0.38.5";
import { retrieveAgoraToken } from "./retrieve-token";

const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL;
const TOKEN = process.env.NEXT_PUBLIC_CLIENT_TOKEN_1;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const VIDEO_WIDTH = 1280;
const VIDEO_HEIGHT = 720;
const VIDEO_PORTRAIT_HEIGHT = 365;

export default function useAgora({
  activePageIndex,
  client,
  arZoneId,
  channel,
  effectsList,
  eventRole,
  videoWidth,
  videoHeight
}) {
  const arDropZone = document.getElementById(arZoneId);
  const [localVideoTrack, setLocalVideoTrack] = useState(undefined);
  const [localAudioTrack, setLocalAudioTrack] = useState(undefined);
  const [joinState, setJoinState] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState(null);

  //video players
  const [arEffects, setArEffects] = useState([]);
  const [arPlayer, setArPlayer] = useState();
  const [arWebcam, setArWebcam] = useState();

  useEffect(() => {
    const webcamSize = {};
    console.log("videoWidth,", videoWidth, videoHeight);
    if (videoWidth > videoHeight) {
      webcamSize.width = VIDEO_WIDTH;
      webcamSize.height = VIDEO_HEIGHT;
    } else {
      webcamSize.width = (VIDEO_PORTRAIT_HEIGHT / videoHeight) * videoWidth;
      webcamSize.height = VIDEO_PORTRAIT_HEIGHT;
    }

    const webcam = new Webcam(webcamSize);
    setArWebcam(webcam);

    const pagesOfBook = []; //unloaded effects
    const effectsObj = effectsList;
    // console.log("effectsObj", effectsObj);
    if (effectsObj) {
      for (const [key, value] of Object.entries(effectsObj)) {
        pagesOfBook[parseInt(key) - 1] = value;
      }
    }

    // console.log("pages of book 1", pagesOfBook, effectsList);
    const effectsArr = []; //loaded effects

    Player.create({
      clientToken: TOKEN,
      locateFile: {
        "BanubaSDK.simd.wasm": "/webar/v0.38/BanubaSDK-v0.38.5.simd.wasm",
        "BanubaSDK.wasm": "/webar/v0.38/BanubaSDK-v0.38.5.wasm",
        "BanubaSDK.data": "/webar/v0.38/BanubaSDK-v0.38.5.data"
      },
      maxFaces: 3
    }).then(async (player) => {
      if (arDropZone) {
        Dom.unmount(`#${arZoneId}`);
      }
      setArPlayer(player);

      pagesOfBook.map(async (page, index) => {
        const effect = await Effect.preload(page);
        effectsArr[index] = effect;
      });
      setArEffects(effectsArr);

      player.use(webcam);
      //player.applyEffect(new Effect(pagesOfBook[0]));
      if (effectsObj && effectsObj[1]) {
        if (activePageIndex && effectsObj[activePageIndex]) {
          player.applyEffect(new Effect(effectsObj[activePageIndex + 1]));
        } else {
          player.applyEffect(new Effect(effectsObj[1]));
        }
      }
      if (document.getElementById(arZoneId)) {
        Dom.render(player, `#${arZoneId}`);
      }
    });

    return () => {
      arWebcam?.stop();
      if (document.getElementById(arZoneId)) {
        Dom.unmount(`#${arZoneId}`);
      }
    };
  }, [effectsList]); //end useEffect()

  useEffect(async () => {
    if (!client) return;
    setRemoteUsers(client.remoteUsers);

    const handleUserPublished = async (user, mediaType) => {
      console.log("user-published");
      await client.subscribe(user, mediaType);
      // toggle rerender while state of remoteUsers changed.
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserUnpublished = (user) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserJoined = (user) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserLeft = (user) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserInfoUpdated = async function (uid, message) {
      console.log("user-info-updated", uid, message);
    };
    const handleConnectionStateChanged = async (state) => {
      console.log("connection-state-changed, STATE", state);
    };
    const handleTokenPrivilegeWillExpire = async function () {
      console.log("token will expire, retrieving new token", token);
      join(options.channel, options.uid);
    };
    const handleTokenPrivilegeDidExpire = async function () {
      console.log("Fetching the new Token");
      join(options.channel, options.uid);
    };
    const handleMediaReconnectStart = async function () {
      console.log("media-reconnect-start");
    };
    const handleMediaReconnectEnd = async function () {
      console.log("media-reconnect-end");
    };
    const handleStreamTypeChanged = async function (uid, streamType) {
      console.log("stream-type-changed", uid, streamType);
    };

    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);
    client.on("user-joined", handleUserJoined);
    client.on("user-left", handleUserLeft);
    client.on("user-info-updated", handleUserInfoUpdated);
    client.on("connection-state-changed", handleConnectionStateChanged);
    // When token-privilege-will-expire occurs, fetch a new token from the server and call renewToken to renew the token.
    client.on("token-privilege-will-expire", handleTokenPrivilegeWillExpire);
    // When token-privilege-did-expire occurs, fetch a new token from the server and call join to rejoin the channel.
    client.on("token-privilege-did-expire", handleTokenPrivilegeDidExpire);
    client.on("media-reconnect-start", handleMediaReconnectStart);
    client.on("media-reconnect-end", handleMediaReconnectEnd);
    client.on("stream-type-changed", handleStreamTypeChanged);

    return () => {
      client.off("user-published", handleUserPublished);
      client.off("user-unpublished", handleUserUnpublished);
      client.off("user-joined", handleUserJoined);
      client.off("user-left", handleUserLeft);
      client.off("connection-state-changed", handleConnectionStateChanged);
      // When token-privilege-will-expire occurs, fetch a new token from the server and call renewToken to renew the token.
      client.off("token-privilege-will-expire", handleTokenPrivilegeWillExpire);
      // When token-privilege-did-expire occurs, fetch a new token from the server and call join to rejoin the channel.
      client.off("token-privilege-did-expire", handleTokenPrivilegeDidExpire);
      client.off("user-info-updated", handleUserInfoUpdated);
      client.off("media-reconnect-start", handleMediaReconnectStart);
      client.off("media-reconnect-end", handleMediaReconnectEnd);
      client.off("stream-type-changed", handleStreamTypeChanged);
    };
  }, [client]);

  if (!client) {
    console.error("client is missing");
    return;
  }
  if (!channel) {
    console.error("channel is missing");
    return;
  }
  if (!arZoneId) {
    console.error("zone id is missing");
    return;
  }
  if (!eventRole) {
    console.error("role at event is missing");
    return;
  }

  // console.log("useAgora", {
  //   client,
  //   arZoneId,
  //   channel,
  //   effectsList,
  //   eventRole
  // });

  const options = {
    // Pass your app ID here.
    appId: APP_ID,
    // Set the channel name.
    channel,
    // Pass a token if your project enables the App Certificate.
    token: null,
    uid: 0,
    role: "host"
  };

  async function createLocalTracks(audioConfig, videoConfig) {
    //#region Banuba Web AR SDK and Agora Web SDK integration
    const stream = new MediaStreamCapture(arPlayer);
    const video = AgoraRTC.createCustomVideoTrack({
      mediaStreamTrack: stream.getVideoTrack()
    });
    //#endregion

    const audio = await AgoraRTC.createMicrophoneAudioTrack();

    setLocalAudioTrack(audio);
    setLocalVideoTrack(video);

    return [audio, video];
  }

  async function join(channel, uid) {
    if (!channel) {
      console.error("needs channel name");
    }

    options.channel = channel;
    options.uid = uid === undefined ? 0 : uid;
    options.token = retrieveAgoraToken(options);

    const [microphoneTrack, cameraTrack] = await createLocalTracks();

    await client.join(
      options.appId,
      options.channel,
      options.token,
      options.uid
    );
    await client.publish([microphoneTrack, cameraTrack]);

    window.client = client;
    window.videoTrack = cameraTrack;

    setJoinState(true);
  }

  async function leave() {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }
    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
    }

    setRemoteUsers(null);
    setJoinState(false);
    await client?.leave();
  }

  async function pauseCamera() {
    console.log("pause camera");
    if (arPlayer) {
      arPlayer.pause();
    }
    if (arWebcam) {
      arWebcam.stop();
    }
    if (localVideoTrack) {
      localVideoTrack?.setEnabled(false);
    }
  }

  async function unpauseCamera() {
    console.log("unpause camera");
    generateEffects();
    if (localVideoTrack) {
      localVideoTrack?.setEnabled(true);
    }
  }

  async function mute() {
    if (localAudioTrack) {
      //arPlayer.setVolume(0);
      localAudioTrack.setEnabled(false);
    }
  }

  async function unmute() {
    if (localAudioTrack) {
      //arPlayer.setVolume(0.5);
      localAudioTrack?.setEnabled(true);
    }
  }

  async function generateEffects() {
    const webcamSize = {};
    if (videoWidth > videoHeight) {
      webcamSize.width = VIDEO_WIDTH;
      webcamSize.height = VIDEO_HEIGHT;
    } else {
      webcamSize.width = (VIDEO_PORTRAIT_HEIGHT / videoHeight) * videoWidth;
      webcamSize.height = VIDEO_PORTRAIT_HEIGHT;
    }

    const webcam = new Webcam(webcamSize);

    setArWebcam(webcam);
    const pagesOfBook = []; //unloaded effects
    const effectsObj = effectsList;
    // console.log("effectsObj", effectsObj);
    if (effectsObj) {
      for (const [key, value] of Object.entries(effectsObj)) {
        pagesOfBook[parseInt(key) - 1] = value;
      }
    }

    // console.log("pages of book 2", pagesOfBook, effectsList);
    const effectsArr = []; //loaded effects

    Player.create({
      clientToken: TOKEN,
      locateFile: {
        "BanubaSDK.wasm": "/webar/BanubaSDK.wasm",
        "BanubaSDK.data": "/webar/BanubaSDK.data"
      },
      maxFaces: 3
    }).then(async (player) => {
      if (arDropZone) {
        Dom.unmount(`#${arZoneId}`);
      }
      setArPlayer(player);

      pagesOfBook.map(async (page, index) => {
        effectsArr[index] = await Effect.preload(page);
      });
      setArEffects(effectsArr);

      player.use(webcam);
      //player.applyEffect(new Effect(pagesOfBook[0]));
      if (effectsObj && effectsObj[1]) {
        if (activePageIndex && effectsObj[activePageIndex]) {
          player.applyEffect(new Effect(effectsObj[activePageIndex + 1]));
        } else {
          player.applyEffect(new Effect(effectsObj[1]));
        }
      }
      if (arDropZone) {
        Dom.render(player, `#${arZoneId}`);
      }
    });
  }

  // console.log("useagora arEffects", arEffects);

  return {
    localAudioTrack,
    localVideoTrack,
    joinState,
    leave,
    join,
    pauseCamera,
    unpauseCamera,
    mute,
    unmute,
    remoteUsers,
    arEffects, // array of ar content,
    arPlayer,
    arWebcam
  };
}

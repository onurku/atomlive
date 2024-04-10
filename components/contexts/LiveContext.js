import { createContext, useContext } from "react";

export const LiveContext = createContext();
export const useLive = () => {
  return useContext(LiveContext);
};

export const StartContext = createContext();
export const useStart = () => {
  return useContext(StartContext);
};

export const LiveUserContext = createContext();
export const useLiveUsers = () => {
  return useContext(LiveUserContext);
};

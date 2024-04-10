//event.js
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import ExternalLayout from "@/components/layouts/ExternalLayout";

const NoSsrLiveStreaming = dynamic(
  () => import("@/components/ui/LiveStreaming"),
  {
    ssr: false
  }
);

function Event() {
  return (
    <>
      <div suppressHydrationWarning={true}>
        <NoSsrLiveStreaming />
      </div>
    </>
  );
}

Event.layout = ExternalLayout;

export default Event;

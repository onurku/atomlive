import { useState, useEffect } from "react";

const localCache = {};

async function requestStripeDetails() {
  try {
    const res = await fetch(`/api/publishers/verify_stripe`);
    const json = (await res.json()) || {}; //{} so app doesn't crash if no network connection
    localCache["stripe"] = json;
    localStorage.setItem("stripe", JSON.stringify(json.data));
  } catch (error) {
    // ignore
    console.error("error", error);
  }
  return localCache["stripe"];
}

export function useStripeDetails() {
  const [stripeDetails, setStripeDetails] = useState();
  const [status, setStatus] = useState("unloaded"); //unloaded, loading, loaded

  useEffect(() => {
    (async () => {
      const localStripe = JSON.parse(localStorage.getItem("stripe"));
      if (localCache["stripe"]) {
        setStripeDetails(localCache["stripe"]);
      } else if (localStripe && localStripe.stripe_customer_id) {
        setStripeDetails(localStripe);
      } else {
        setStatus("loading");
        await requestStripeDetails();
        setStripeDetails(localCache["stripe"]);
      }
      setStatus("loaded");
    })();
  }, [setStripeDetails]);

  return { stripe: stripeDetails, status };
}

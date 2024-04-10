import { supabase } from "@/utils/supabase-client";
import useResponse from "@/utils/api-hooks/useResponse";

const logout = async (req, res) => {
  const { event, session } = req.body;

  const { badJson } = useResponse(res);

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return badJson("Method Not Allowed", 405);
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    return badJson(error);
  }

  if (event && session) {
    supabase.auth.api.setAuthCookie(req, res);
  }
};

export default logout;

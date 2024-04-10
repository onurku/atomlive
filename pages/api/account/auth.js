import { supabase } from "@/utils/supabase-client";

const auth = async (request, res) => {
  const { email, password } = request;
  const response = await supabase.auth.signUp({
    email,
    password
  });
  const { user, session, error } = response;
  console.log(response);
};

export default auth;

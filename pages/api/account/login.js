import { supabase } from "@/utils/supabase-client";
import useResponse from "@/utils/api-hooks/useResponse";
import useTimezone from "@/utils/api-hooks/useTimezone";

const login = async (req, res) => {
  const { email, password } = req.body;

  const { badJson, goodJson } = useResponse(res);

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return badJson("Method Not Allowed", 405);
  }

  if (!email) {
    return badJson("Email was blank");
  }
  if (!password) {
    return badJson("Password was blank");
  }

  const { user, session, error } = await supabase.auth.signIn({
    email,
    password
  });

  if (error) {
    return badJson(error);
  }

  const { data, error: err } = await supabase
    .from("users")
    .select()
    .eq("email", user.email)
    .single();

  if (err) {
    return badJson(err);
  }

  if (Boolean(Date.parse(user.email_confirmed_at)) && !data.email_verified) {
    const { data: data_email, error: err_email } = await supabase
      .from("users")
      .update({ email_verified: true })
      .match({ email: user.email })
      .single();
  }

  delete data.id;
  delete data.email_verification_code;
  let userData = data;

  if (!data.timezone) {
    const tz = await useTimezone();
    console.log("tz", tz);

    const timezoneUpdate = {
      city: tz.data.city,
      country: tz.data.country_code,
      timezone: `${tz.data.datetime.offset_tzab},${tz.data.timezone.id},${tz.data.datetime.offset_gmt}`,
      metadata_timezone: tz.data
    };

    const { data: data_timezone, error: err_timezone } = await supabase
      .from("users")
      .update(timezoneUpdate)
      .match({ email: user.email });
    userData = Object.assign({}, data, timezoneUpdate);
  }

  goodJson({
    user: userData,
    session,
    message: "You have been successfully logged in!"
  });
};

export default login;

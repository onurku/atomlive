import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Logo from "@/components/icons/Logo";
import ExternalLayout from "@/components/layouts/ExternalLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { postData } from "@/utils/helpers";
import { useUser } from "@/utils/useUser";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const router = useRouter();
  const { user, signUp } = useUser();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password2 !== password)
      return setMessage({
        type: "error",
        content: "Passwords do not match"
      });

    setLoading(true);
    setMessage({});

    try {
      const { data, error } = await postData({
        url: "/api/account/register",
        data: { first_name: firstName, last_name: lastName, email, password }
      });

      console.log({ data, error });

      if (error) {
        setMessage({ type: "error", content: error.message });
        return setLoading(false);
      }

      await postData({
        url: "/api/account/auth",
        data: { event: "SIGNED_IN", session: data.session }
      });

      setMessage({
        type: "note",
        content: data.message || "Your account has been created"
      });
    } catch (error) {
      console.error("Post data error", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     router.replace("/account");
  //   }
  // }, [user]);

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <div className="flex justify-center pb-12 ">
          <Logo width="64px" height="64px" />
        </div>
        <form onSubmit={handleSignup} className="flex flex-col space-y-4">
          {message.content && (
            <div
              className={`${
                message.type === "error" ? "text-pink" : "text-green"
              } border ${
                message.type === "error" ? "border-pink" : "border-green"
              } p-3`}
            >
              {message.content}
            </div>
          )}
          <Input
            placeholder="First Name"
            autoComplete="given-name"
            name="fname"
            value={firstName}
            onChange={setFirstName}
          />
          <Input
            placeholder="Last Name"
            autoComplete="family-name"
            name="lname"
            value={lastName}
            onChange={setLastName}
          />
          <Input
            type="email"
            placeholder="Email"
            autoComplete="email"
            name="email"
            value={email}
            onChange={setEmail}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            autoComplete="password"
            value={password}
            onChange={setPassword}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={setPassword2}
          />
          <div className="pt-2 w-full flex flex-col">
            <Button
              variant="slim"
              type="submit"
              loading={loading}
              disabled={
                loading ||
                !firstName.length ||
                !lastName.length ||
                !email.length ||
                !password.length ||
                !password2.length
              }
            >
              Sign up
            </Button>
          </div>

          <span className="pt-1 text-center text-sm">
            <span className="text-accents-7">Do you have an account?</span>
            {` `}
            <Link href="/signin">
              <a className="text-accent-9 font-bold hover:underline cursor-pointer">
                Sign in.
              </a>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

SignUp.layout = ExternalLayout;

export default SignUp;

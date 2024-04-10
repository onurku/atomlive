import { useSession } from "next-auth/react";

export function useAdmin() {
  const { data, status } = useSession();

  const isCurrentUserAdmin =
    data?.user?.email.includes("@atom.live") ||
    data?.user?.email === "lqnguyen+1@hotmail.com" ||
    data?.user?.email === "lqnguyen+11@hotmail.com" ||
    data?.user?.email === "lqnguyen@hotmail.com" ||
    data?.user?.email === "emre.kiriscioglu@gmail.com" ||
    data?.user?.email === "yapanel.ai@gmail.com" ||
    data?.user?.email === "emre.atomdotlive@gmail.com";

  return status === "authenticated" && isCurrentUserAdmin;
}

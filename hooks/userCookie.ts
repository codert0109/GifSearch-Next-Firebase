import { userDataType } from "@/types";
import cookies from "js-cookie";

export const getUserFromCookie = () => {
  const cookie = cookies.get("auth");
  try {
    if(cookie) {
      return JSON.parse(cookie);
    } else {
      return;
    }
  } catch (e) {
    return;
  }
};

export const setUserCookie = (user: userDataType) => {
  cookies.set("auth", JSON.stringify(user), {
    expires: 1 / 24,
  });
};

export const removeUserCookie = () => cookies.remove("auth");

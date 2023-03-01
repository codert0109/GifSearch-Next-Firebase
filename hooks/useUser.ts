import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { initFirebase } from "../config";
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie,
} from "./userCookie";
import { userDataType } from "@/types";

initFirebase();

export const mapUserData = async (user: any) => {
  try {
    const { uid, email } = user;
    const token = await user.getIdToken(true);
    return {
      id: uid,
      email,
      token,
    };
  } catch (e) {
    console.log(e);
  }
};
const useUser = () => {
  const [user, setUser] = useState({} as userDataType);
  const router = useRouter();

  const logout = async () => {
    router.push("/");
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // router.push("/");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged(async (userToken) => {
        if (userToken) {
          const userData = await mapUserData(userToken);
          userData && setUserCookie(userData);
          userData && setUser(userData);
        } else {
          removeUserCookie();
          setUser({} as userDataType);
        }
      });

    const userFromCookie = getUserFromCookie();
    if (!userFromCookie) {
      return;
    }
    setUser(userFromCookie);
    return () => cancelAuthListener();
  }, []);

  return { user, logout };
};

export { useUser };

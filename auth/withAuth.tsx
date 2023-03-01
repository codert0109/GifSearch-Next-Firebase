import React, { Component, useEffect } from "react";
import router from "next/router";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initFirebase } from "../config";

initFirebase();
const auth = firebase.auth();

const withAuth = (SearchComponent: React.FC) => (props: any) => {
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        router.push("/signin");
      }
    });
  }, []);

  return (
    <div>
      <SearchComponent {...props} />
    </div>
  );
};

export default withAuth;

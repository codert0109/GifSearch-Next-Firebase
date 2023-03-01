import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initFirebase } from "../config";
import { setUserCookie } from "../hooks/userCookie";
import { mapUserData } from "../hooks/useUser";

type firebaseAuthConfigProps = {
  signInSuccessUrl: string
};

initFirebase();
const firebaseAuthConfig = ({ signInSuccessUrl }: firebaseAuthConfigProps) => ({
  signInFlow: "popup",
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl,
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: ({ user }: any, redirectUrl?: string) => {
      mapUserData(user).then(userData => {
        if(userData) {
          setUserCookie(userData);
        }
      });
      return true;
    },
  },
});

const FirebaseAuth = () => {
  const signInSuccessUrl = "/";
  return (
    <div className="text-center mx-auto col-3 border py-5" style={{ marginTop: 200, backgroundColor: '#fff5f5' }}>
      <StyledFirebaseAuth
        uiConfig={firebaseAuthConfig({ signInSuccessUrl })}
        firebaseAuth={firebase.auth()}
      />
    </div>
  );
};

export default FirebaseAuth;

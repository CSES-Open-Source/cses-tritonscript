import classes from "./GoogleAuthButton.module.css";
import googleLogoUrl from "../../assets/google.svg";
import { signInFailure, signInStart, signInSuccess } from "../../utils/userSlice.ts";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.tsx";
import { useDispatch } from "react-redux";

export default function GoogleAuthButton({ text }: { text: string }) {
  const dispatch = useDispatch();

  async function handleClick() {
    try {
      dispatch(signInStart());
      signInWithPopup(auth, new GoogleAuthProvider())
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(signInSuccess(user));
        });
    } catch (error) {
      dispatch(signInFailure(error));
    }
  }

  return <div className={classes.button} onClick={handleClick}>
    <div className={classes.googleLogo}>
      <svg width={40} height={40}>
        <image width={40} height={40} href={googleLogoUrl} />
      </svg>
    </div>
    <div className={classes.text}><span>{text}</span></div>
  </div>;
}
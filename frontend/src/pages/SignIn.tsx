import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import GoogleAuthButton from "../components/GoogleAuthButton/GoogleAuthButton.tsx";
import logoUrl from "../assets/cses-opensource.png";
import "./SignIn.css";

export default function SignIn() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser, navigate]);

  return (
    <div className="signInPage">
      <header className="signInHeader">
        <a href="/" className="home">Home</a>
        <img className="csesLogo" src={logoUrl} alt="CSES Open-Source logo" />
      </header>
      <div className="signInContainer">
        <p className="loginPrompt">Login with your UCSD email</p>
        <GoogleAuthButton text={"Sign in with Google"} />
      </div>
    </div>
  );
}

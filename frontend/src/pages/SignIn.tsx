import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
// import settings from "../utils/config";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import formStyles from "../form.module.css";
import logoUrl from "../assets/cses-opensource.png";
import GoogleAuthButton from "../components/GoogleAuthButton/GoogleAuthButton.tsx";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state: any) => state.user);
  const { currentUser } = useSelector((state: any) => state.user);

  function handleChange(e: { target: { id: any; value: any } }) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const email = e.target[1].value;
      const password = e.target[2].value;
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(signInSuccess(user));
          // ...
          navigate("/");
        });
      // .catch((error) => {
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      // });

    } catch (error) {
      dispatch(signInFailure(error));
    }
  }

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser, navigate]);

  return (
    <div className={"pageContainer"}>
      {/* I think this section should be part of the navbar component because it's shared */}
      <div className={""}>
        <p>Dont Have an account?</p>
        <Link to="/signup">
          <span>Sign up</span>
        </Link>
      </div>

      <img className={"csesLogo"} src={logoUrl} alt={"CSES Open-Source logo"} />

      <p className={error ? "sign-in-error" : ""}>
        {error ? error.message || "Something went wrong!" : loading ? "Loading..." : ""}
      </p>

      <div className={formStyles.formContainer}>
        <form onSubmit={handleSubmit}>
          <input className={formStyles.formInput} type="email" placeholder="Email" id="email" onChange={handleChange} />
          <input className={formStyles.formInput} type="password" placeholder="Password" id="password"
                 onChange={handleChange} />
          <button type="submit" className={formStyles.formSubmit}>Sign In</button>
        </form>
        <p className={"forgot-password"}>Forgot your password?</p>
      </div>

      <GoogleAuthButton text={"Sign in with Google"} />
    </div>
  );
}

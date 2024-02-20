import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
// import settings from "../utils/config";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./SignIn.css";
import logoUrl from "../assets/cses-opensource.png";

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
    <div className={"sign-in-container"}>
      {/* I think this section should be part of the navbar component because it's shared */}
      <div className={"sign-in-footer"}>
        <p>Dont Have an account?</p>
        <Link to="/signup">
          <span>Sign up</span>
        </Link>
      </div>

      <img src={logoUrl} alt={"CSES Open-Source logo"} />

      <p className={error ? "sign-in-error" : ""}>
        {error ? error.message || "Something went wrong!" : loading ? "Loading..." : ""}
      </p>

      <div className={"sign-in-form"}>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" id="email" onChange={handleChange} />
          <input type="password" placeholder="Password" id="password" onChange={handleChange} />
          <button>Sign in</button>
          {/*Not in figma design -> <button disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>*/}
        </form>
        <p className={"forgot-password"}>Forgot your password?</p>
      </div>

      <a className={"google-login"}>Sign in with Google</a>
    </div>
  );
}

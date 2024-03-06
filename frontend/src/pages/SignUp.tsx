import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
//import settings from "../utils/config";
import { useSelector } from "react-redux";
import { auth } from "../firebase";
//import firebase from "firebase/compat/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import GoogleAuthButton from "../components/GoogleAuthButton/GoogleAuthButton.tsx";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  function handleChange(e: any) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    console.log(e.target[0]);
    const email = e.target[1].value;
    const password = e.target[2].value;
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            setLoading(false);
            navigate("/signin");
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
            setLoading(false);
            setError(true);
        });


    // try {
    //   setLoading(true);
    //   setError(false);
    //   const res = await fetch(`${settings.domain}/api/auth/signup`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   const data = await res.json();
    //   console.log(data);
    //   setLoading(false);
    //   if (data.success === false) {
    //     setError(true);
    //     return;
    //   }
    //   navigate("/signin");
    // } catch (error) {
    //   setLoading(false);
    //   setError(true);
    // }
  }

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser, navigate]);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>

      <GoogleAuthButton text={"Sign up with Google"} />
    </div>
  );
}

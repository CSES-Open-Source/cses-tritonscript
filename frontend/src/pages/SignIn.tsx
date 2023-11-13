import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import settings from "../utils/config";
import '../../src/App.css';

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
      const res = await fetch(`${settings.domain}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This here
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  }

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser, navigate]);

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" id="email" onChange={handleChange}/>
        <input type="password" placeholder="Password" id="password" onChange={handleChange}/>
        <Link to="#">
          <span>Forgot Password</span>
        </Link>
        <button disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>
      </form>
      <div>
        <p>Dont Have an account?</p>
        <Link to="/signup">
          <span>Sign in with Google</span>
        </Link>
      </div>
      <p>{error ? error.message || "Something went wrong!" : ""}</p>
    </div>
  );
}

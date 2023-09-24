import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../utils/userSlice";
import settings from "../utils/config";

export default function Profile() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector((state: any) => state.user);

  async function handleChange(e: { target: { id: any; value: any } }) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (formData.username.length < 3) return alert("Username must be at least 3 characters long.");
    try {
      dispatch(updateUserStart());
      const res = await fetch(`${settings.domain}/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  }

  async function handleDeleteAccount() {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`${settings.domain}/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  }

  async function handleSignOut() {
    try {
      await fetch(`${settings.domain}/api/auth/signout`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          onChange={handleChange}
        />
        {/* Change email & password */}
        {/* <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" onChange={handleChange} /> */}
        {/* <input type="password" id="password" placeholder="Password" onChange={handleChange} /> */}
        <button>{loading ? "Loading..." : "Update"}</button>
      </form>
      <div>
        {/* Delete Account */}
        {/* <span onClick={handleDeleteAccount}>Delete Account</span> */}
      </div>
      <p>{error && "Something went wrong!"}</p>
      <p>{updateSuccess && "User is updated successfully!"}</p>
    </div>
  );
}

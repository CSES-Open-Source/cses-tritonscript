import { useDispatch, useSelector } from "react-redux";
import settings from "../utils/config";
import { signOut } from "../utils/userSlice";
export default function Home() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.user);

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
      <h1>CSES OPEN SOURCE PROJECT</h1>
      <h4>Hi, {currentUser.username}</h4>
      <a href="/profile">Change Profile</a>
      <div>
        <button onClick={handleSignOut}>Sign out</button>
      </div>
    </div>
  );
}

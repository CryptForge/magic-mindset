import Popup from "reactjs-popup";
import { authFetch } from "../../../util";
import { useAuthContext } from "../../../AuthContext";
import { useState } from "react";
import { API_BASE } from "../../../main";
import { useEffect } from "react";

const CoachRecommendation = (props) => {
  const [userName, setUserName] = useState("");

  const auth = useAuthContext();
  useEffect(() => {
    fetchName().then(setUserName);
  }, []);
  async function fetchName() {
    const response = await authFetch(
      `${API_BASE}/user/${props.userId}`,
      auth.getUser().token
    );
    const data = await response.json();
    return data.name;
  }
  return (
    <li className="divider min-width-0">
      <div>{userName}</div>
      <div>{new Date(props.date).toUTCString()}</div>
      <Popup modal trigger={<button>View</button>}>
        <div className="white-element">{props.message}</div>
      </Popup>
    </li>
  );
};
export default CoachRecommendation;

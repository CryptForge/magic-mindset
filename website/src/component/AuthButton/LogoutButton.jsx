import { useContext } from "react";
import AuthContext from "../../AuthContext";
import "./AuthButton.css";
import Popup from "reactjs-popup";
import ConfirmLogout from "./ConfirmLogout";

const LogoutButton = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="navigation-link">
      <Popup trigger={<div>Logout</div>} modal>
        <ConfirmLogout />
      </Popup>
    </div>
  );
};

export default LogoutButton;

import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../../AuthContext";
import Popup from "reactjs-popup";
import ConfirmLogout from "./ConfirmLogout";

const LogoutButton = () => {
  return (
    <div className="navigation-link">
      <Popup trigger={<div>Logout</div>} modal>
        <ConfirmLogout />
      </Popup>
    </div>
  );
};

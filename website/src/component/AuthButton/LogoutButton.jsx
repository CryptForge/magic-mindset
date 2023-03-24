import { useContext } from "react";
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

export default LogoutButton;

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../AuthContext";

const ConfirmLogout = () => {
  const auth = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <div className="white-element">
      <div
        onClick={() => {
          auth.userLogout();
          nav("/");
        }}
        className="popup-text-pointer"
      >
        Click here to logout!
      </div>
    </div>
  );
};

export default ConfirmLogout;

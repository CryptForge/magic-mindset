import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../AuthContext";

const ConfirmLogout = () => {
  const auth = useAuthContext();
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

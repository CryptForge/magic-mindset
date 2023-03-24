import { useContext } from "react";
import AuthContext from "../../AuthContext";

const ConfirmLogout = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="white-element">
      <div onClick={() => auth.userLogout()} className="popup-text-pointer">
        Click here to logout!
      </div>
    </div>
  );
};

export default ConfirmLogout;

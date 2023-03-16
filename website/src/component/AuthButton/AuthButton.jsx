import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const AuthButton = (props) => {
  const auth = useContext(AuthContext);

  if (auth.authenticated) {
    return <LogoutButton logOut={props.logOut} />;
  } else {
    return <LoginButton />;
  }
};

export default AuthButton;
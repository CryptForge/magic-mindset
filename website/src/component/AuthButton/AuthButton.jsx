import { useAuthContext } from "../../AuthContext";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const AuthButton = () => {
  const auth = useAuthContext();

  if (auth.userIsAuthenticated()) {
    return <LogoutButton />;
  } else {
    return <LoginButton />;
  }
};

export default AuthButton;

import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const Protected = (props) => {
  const auth = useContext(AuthContext);

  if (!auth.authenticated) {
    return <></>;
  }

  if (props.role !== undefined) {
    const roles = props.role.includes("|")
      ? props.role.split("|")
      : [props.role];

    if (!roles.includes(auth.info.role)) {
      return <></>;
    }
  }

  return <>{props.children}</>;
};

export default Protected;

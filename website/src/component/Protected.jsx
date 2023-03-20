import AuthContext from "../AuthContext";
import { useContext } from "react";

const Protected = (props) => {
  const auth = useContext(AuthContext);

  if (!auth.userIsAuthenticated()) {
    return getOrElse(props.orElse);
  }

  if (props.role !== undefined) {
    if (auth.getUser().role !== undefined) {
      const roles = props.role.includes("|")
        ? props.role.split("|")
        : [props.role];

      if (!roles.includes(auth.getUser().role)) {
        return getOrElse(props.orElse);
      }
    }
  }

  return <>{props.children}</>;
};

const getOrElse = (orElse) => {
  if (orElse === undefined) {
    return <></>;
  }
  return orElse;
};

export default Protected;

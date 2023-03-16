import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const Protected = (props) => {
  const auth = useContext(AuthContext);

  if (!auth.authenticated) {
    return getOrElse(props.orElse);
  }

  if (props.role !== undefined) {
    const roles = props.role.includes("|")
      ? props.role.split("|")
      : [props.role];

    if (!roles.includes(auth.info.role)) {
      return getOrElse(props.orElse);
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

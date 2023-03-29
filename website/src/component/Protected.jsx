import { useAuthContext } from "../AuthContext";

const Protected = (props) => {
  const auth = useAuthContext();

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

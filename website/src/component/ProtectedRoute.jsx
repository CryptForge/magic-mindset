import { Navigate } from "react-router-dom";
import Protected from "./Protected";

const ProtectedRoute = (props) => {
  return (
    <Protected role={props.role} orElse={<Navigate to="/login" replace />}>
      {props.children}
    </Protected>
  );
};

export default ProtectedRoute;

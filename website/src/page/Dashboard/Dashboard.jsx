import React, { useContext } from "react";
import "./Dashboard.css";
import User from "../../component/Dashboard/User/User";
import HR from "../../component/Dashboard/HR/HR";
import Coach from "../../component/Dashboard/Coach/Coach";
import Manager from "../../component/Dashboard/Manager/Manager";
import { AuthContext } from "../../AuthContext";
import Protected from "../../component/Protected";

const Dashboard = (props) => {
  const auth = useContext(AuthContext);
  return (
    <div>
      <Protected role="TRAINEE">
        <User />
      </Protected>
      <Protected role="COACH">
        <Coach />
      </Protected>
      <Protected role="MANAGER">
        <Manager />
      </Protected>
      <Protected role="HR">
        <HR />
      </Protected>
    </div>
  );
};

export default Dashboard;

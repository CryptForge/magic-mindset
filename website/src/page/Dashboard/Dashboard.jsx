import React, { useContext } from "react";
import "./Dashboard.css";
import User from "../../component/Dashboard/User/User";
import HR from "../../component/Dashboard/HR/HR";
import Coach from "../../component/Dashboard/Coach/Coach";
import Manager from "../../component/Dashboard/manager/Manager";
import { AuthContext } from "../../AuthContext";
import Protected from "../../component/Protected";

const Dashboard = (props) => {
  const auth = useContext(AuthContext);

  // if (!auth.authenticated) {
  //   return "😯";
  // }

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

  // switch(auth.info.role) {
  //   case "TRAINEE":
  //     return <User />;
  //   case "COACH":
  //     return <Coach/>;
  //   case "MANAGER":
  //     return <Manager />
  //   case "HR":
  //     return <HR/>
  //   }
};

export default Dashboard;

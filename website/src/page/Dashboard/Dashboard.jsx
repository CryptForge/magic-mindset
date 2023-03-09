import React from "react";
import "./Dashboard.css";
import User from "../../component/Dashboard/User/User";
import HR from "../../component/Dashboard/HR/HR";
import Coach from "../../component/Dashboard/Coach/Coach";
import Manager from "../../component/Dashboard/manager/Manager";

const Dashboard = (props) => {
  return (
    <div>
      <User />
      <HR />
      <Coach />
      <Manager />
    </div>
  );
};

export default Dashboard;

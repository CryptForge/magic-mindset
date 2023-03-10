import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import User from "../../component/Dashboard/User/User";
import HR from "../../component/Dashboard/HR/HR";
import Coach from "../../component/Dashboard/Coach/Coach";
import Manager from "../../component/Dashboard/manager/Manager";

const Dashboard = (props) => {
  const [activeComp, setActiveComp] = useState("User");

  switch (activeComp) {
    case "User":
      return <User />;
    case "Coach":
      return <Coach />;
    case "Manager":
      return <Manager />;
    case "HR":
      return <HR />;
  }
  return "😯";
};

export default Dashboard;

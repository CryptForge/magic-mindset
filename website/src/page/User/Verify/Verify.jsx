import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { verifyUserAccount } from "../../../util";
import { toast } from "react-toastify";

const Verify = () => {
  const nav = useNavigate();
  const [isLoading, setLoading] = useState(true);

  function getUrlParameter(name) {
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    var results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  const email = getUrlParameter("email");

  useEffect(() => {
    async function verifyEmailTask() {
      const response = await verifyUserAccount(email);
      const data = await response.text();
      toast(data);
      setLoading(false);
    }
    if (email && isLoading) {
      verifyEmailTask();
    }
  }, [email]);

  useEffect(() => {
    if (!isLoading) {
      return nav("/login");
    }
  }, [isLoading]);
};

export default Verify;

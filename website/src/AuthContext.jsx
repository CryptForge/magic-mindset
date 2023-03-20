import React, { Component, useContext } from "react";
import { isTokenValid } from "./util";

const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    const user = localStorage.getItem("user");
    this.setState({ user });
  }

  userRole = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.role;
  };

  getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  userIsAuthenticated = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      return false;
    }
    const parsedUser = JSON.parse(user);

    if (!isTokenValid(parsedUser.token)) {
      this.userLogout();
      return false;
    }
    return true;
  };

  userLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({ user });
  };

  userLogout = () => {
    localStorage.removeItem("user");
    this.setState({ user: null });
  };

  render() {
    const { children } = this.props;
    const { user } = this.state;
    const { getUser, userRole, userIsAuthenticated, userLogin, userLogout } =
      this;

    return (
      <AuthContext.Provider
        value={{
          user,
          getUser,
          userIsAuthenticated,
          userLogin,
          userLogout,
          userRole,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export function useAuthContext() {
  return useContext(AuthContext);
}

export { AuthProvider };

export default AuthContext;

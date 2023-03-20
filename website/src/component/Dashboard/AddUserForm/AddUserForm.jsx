import React, { useContext } from "react";
import { API_BASE } from "../../../main";
import { authPostForm } from "../../../util";
import "./AddUserForm.css";
import AuthContext from "../../../AuthContext";

const AddUserForm = () => {
  const auth = useContext(AuthContext);
  return (
    <form
      onSubmit={(event) =>
        authPostForm(event, `${API_BASE}/user/create`, auth.info.token)
      }
    >
      <div className="flex column form">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required></input>
        <label htmlFor="role">Role</label>
        <select id="role" name="role">
          <option value="trainee">Trainee</option>
          <option value="coach">Coach</option>
          <option value="manager">Manager</option>
          <option value="hr">HR</option>
        </select>
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" required type="email"></input>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" required></input>

        <label htmlFor="city">City</label>
        <input id="city" name="city" required></input>
        <label htmlFor="address">Address</label>
        <input id="address" name="address" required></input>

        <input type="submit" value="Add user!"></input>
      </div>
    </form>
  );
};
export default AddUserForm;

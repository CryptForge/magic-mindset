import React from "react";
import { API_BASE } from "../../../main";
import { authPostForm } from "../../../util";
import "./AddUserForm.css";
import { useAuthContext } from "../../../AuthContext";

const AddUserForm = (props) => {
  const auth = useAuthContext();

  async function postForm(event) {
    await authPostForm(event, `${API_BASE}/user/create`, auth.getUser().token);
    props.callClose();
    props.changeValues(true);
  }

  return (
    <form onSubmit={(event) => postForm(event)}>
      <div className="flex flex-column form">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required></input>
        <label htmlFor="role">Role</label>
        <select id="role" name="role">
          <option value="TRAINEE">Trainee</option>
          <option value="COACH">Coach</option>
          <option value="MANAGER">Manager</option>
          <option value="HR">HR</option>
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

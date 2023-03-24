import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../../AuthContext";
import { getUser, profileUpload } from "../../../util";

const Profile = () => {
  const auth = useContext(AuthContext);

  const nav = useNavigate();

  const [isLoading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [isLocalImage, setLocalImage] = useState(false);

  useEffect(() => {
    async function getData() {
      const response = await getUser(auth.getUser().id, auth.getUser().token);
      const data = await response.json();
      setName(data.name);
      setEmail(data.email);
      setImage(data.image);
      setLoading(false);
    }
    getData();
  }, []);

  const onFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", auth.getUser().id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password === "" ? null : password);
    formData.append("image", image);
    formData.get("password");
    profileUpload(auth.getUser().token, formData);
    nav("/dashboard");
  };

  return (
    <div className="side-lines-divider">
      <div className="side-lines-left">
        <NavLink to="/dashboard" className="link">
          Dashboard
        </NavLink>
        <div className="line-container">
          <div className="line"></div>
        </div>
      </div>
      <div className="side-lines-middle">
        <div className="split-flex">
          <div className="profile-inner">
            {(isLoading === true && <h2>Loading...</h2>) || (
              <form>
                <div className="flex">
                  <div className="flex flex-column">
                    <div className="uploader-image">
                      {image && isLocalImage && (
                        <img
                          alt="not found"
                          width={"250px"}
                          src={URL.createObjectURL(image)}
                          className="uploader-image-src"
                        />
                      )}
                      {image && !isLocalImage && (
                        <img
                          alt="not found"
                          width={"250px"}
                          src={`data:image/jpeg;base64,${image}`}
                          className="uploader-image-src"
                        />
                      )}
                      {!image && (
                        <div className="text-avatar">
                          <span>
                            {auth.getUser().username &&
                              auth.getUser().username[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      name="myImage"
                      className="uploader"
                      onChange={(event) => {
                        setImage(event.target.files[0]);
                        setLocalImage(true);
                      }}
                      accept="image/*"
                    />
                  </div>
                  <div className="flex flex-column text-profile">
                    <label htmlFor="name" className="black">
                      Name
                    </label>
                    <input
                      id="name"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    ></input>
                    <label htmlFor="email" className="black">
                      E-Mail
                    </label>
                    <input
                      id="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      //type="email"
                    ></input>
                    <label htmlFor="password" className="black">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="flex space-between margin-top-1vh">
                  <NavLink to="/dashboard">
                    <button className="button">Back to Dashboard!</button>
                  </NavLink>
                  <input
                    className="button"
                    type="submit"
                    value="Save"
                    onClick={onFormSubmit}
                  ></input>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="side-lines-right">
        <div className="side-lines-right-text">
          Let your magical adventure begin
        </div>
      </div>
    </div>
  );
};

export default Profile;

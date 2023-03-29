import React from "react";
import DashboardTraineeList from "../Common/DashboardTraineeList";
import DashboardInvitation from "../Common/DashboardInvitation";
import AddInvitationForm from "../Common/AddInvitiationForm";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../AuthContext";
import { useEffect, useState } from "react";
import { API_BASE } from "../../../main";
import { authFetch } from "../../../util";

const Manager = () => {
  const auth = useAuthContext();
  const [traineeList, setTraineeList] = useState([]);

  useEffect(() => {
    authFetch(
      `${API_BASE}/trainee/all/${auth.getUser().role.toLowerCase()}/${
        auth.getUser().id
      }`,
      auth.getUser().token
    )
      .then((response) => response.json())
      .then((data) => setTraineeList(data));
  }, []);
  const inviteArray = [
    {
      date: new Date("1994-10-21"),
      answered: true,
    },
    {
      date: new Date("2006-07-06"),
      answered: true,
    },
    {
      date: new Date("2003-04-03"),
      answered: false,
    },
    {
      date: new Date("2016-05-16"),
      answered: true,
    },
    {
      date: new Date("2020-01-12"),
      answered: false,
    },
  ];

  inviteArray.sort((a, b) => a.date.getTime() - b.date.getTime());
  const answeredInvites = inviteArray.filter((invite) => invite.answered);
  const unansweredInvites = inviteArray.filter((invite) => !invite.answered);
  return (
    <div className="grid grid-2x2first1x2">
      <div className="grid-element element box1">
        <div className="min-width-0">
          <h2>Students</h2>
          <ul className="alternating-ul flex flex-column padding-bottom-alternating-ul">
            {traineeList.map((trainee, index) => (
              <DashboardTraineeList
                key={index}
                trainee={trainee}
                id={trainee.id}
                index={index}
              />
            ))}
          </ul>
          <Link to="/traineepage">
            <button className="button">View all</button>
          </Link>
        </div>
      </div>
      <div className="grid-element element box2">
        <div className="min-width-0">
          <h2>Show invites to feedback</h2>
          <ul className="alternating-ul flex flex-column padding-bottom-alternating-ul">
            {answeredInvites.map((invitation, index) => (
              <DashboardInvitation
                key={index}
                date={invitation.date.toLocaleDateString()}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="grid-element element box3">
        <div>
          <h2>Plan Meeting</h2>
          <div>
            <Popup
              trigger={<button className="button">Add Invitation</button>}
              modal
            >
              <AddInvitationForm traineeList={traineeList} />
            </Popup>
          </div>
          <div>
            <span>List with awaiting response</span>
          </div>
          <ul className="alternating-ul flex flex-column padding-bottom-alternating-ul">
            {unansweredInvites.map((invitation, index) => (
              <DashboardInvitation
                key={index}
                date={invitation.date.toLocaleDateString()}
                mine={true}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Manager;

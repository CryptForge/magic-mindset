import React from "react";
import DashBoardTraineeList from "../DashboardTraineeList";
import DashBoardInvitation from "../DashBoardInvitation";
import AddInvitationForm from "../AddInvitation/AddInvitiationForm";
import Popup from "reactjs-popup";
const Manager = (props) => {
  const traineeArray = [
    {
      name: "Victor",
      id: 0,
    },
    {
      name: "Tijs",
      id: 1,
    },
    {
      name: "Rebecca",
      id: 2,
    },
  ];
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
    <div className="grid grid2x2first1x2">
      <div className="gridelement element box1">
        <div>
          <h2>Show all students and also button for single one</h2>
          <h2>Students</h2>
          <ul>
            {traineeArray.map((trainee, index) => (
              <DashBoardTraineeList
                key={index}
                name={trainee.name}
                id={trainee.id}
                index={index}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="gridelement element box2">
        <div>
          <h2>Show invites to feedback</h2>
          <ul>
            {answeredInvites.map((invitation, index) => (
              <DashBoardInvitation
                key={index}
                date={invitation.date.toLocaleDateString()}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="gridelement element box3">
        <div>
          <h2>Plan Meeting</h2>
          <div>
            <Popup trigger={<button>Add Invitation</button>} modal>
              <AddInvitationForm traineeArray={traineeArray} />
            </Popup>
          </div>
          <div>
            <span>List with awaiting response</span>
          </div>
          <ul>
            {unansweredInvites.map((invitation, index) => (
              <DashBoardInvitation
                key={index}
                date={invitation.date.toLocaleDateString()}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Manager;

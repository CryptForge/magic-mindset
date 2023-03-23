import React from "react";
import Popup from "reactjs-popup";
import DashboardInvitation from "../DashboardInvitation";
import CoachRecommendation from "./CoachRecommendation";
import DashboardTraineeList from "../DashboardTraineeList";
import AddRecommendationForm from "../AddRecommendationForm/RecommendationForm.jsx";
import AddInvitationForm from "../AddInvitation/AddInvitiationForm.jsx";

const Coach = (props) => {
  let traineeArray = [
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

  const recommendationArray = [
    {
      date: "1994-10-21",
      message: "Terrible",
    },
    {
      date: "2006-07-06",
      message: "Amazing",
    },
    {
      date: "2003-04-03",
      message: "What is this?",
    },
  ];

  return (
    <div className="grid grid-2x2">
      <div className="grid-element element box1">
        <div>
          <h2>Students</h2>
          <ul>
            {traineeArray.map((trainee, index) => (
              <DashboardTraineeList
                key={index}
                name={trainee.name}
                id={trainee.id}
                index={index}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="grid-element element box2">
        <div>
          <h2>Show invitations</h2>
          <ul>
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
          <h2>Recommendation to student</h2>
          <ul>
            {recommendationArray.map((recommendation, index) => (
              <CoachRecommendation
                date={recommendation.date}
                message={recommendation.message}
                key={index}
              />
            ))}
          </ul>
          <Popup modal trigger={<button>Add Recommendation</button>}>
            <AddRecommendationForm traineeArray={traineeArray} />
          </Popup>
        </div>
      </div>
      <div className="grid-element element box4">
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
              <DashboardInvitation
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

export default Coach;

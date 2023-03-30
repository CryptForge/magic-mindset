const TraineeInfo = (props) => {
  if (JSON.stringify(props.trainee) === "{}") {
    return (
      <div className="grid-element element box2">
        <div className="text">Loading</div>
      </div>
    );
  }
  return (
    <div className="grid-element element box2 text">
      <div>
        Name: <span className="capitalize">{props.trainee.name}</span>
      </div>
      <div>Email: {props.trainee.user.email}</div>
      <div>Addess: {props.trainee.address}</div>
      <div>City: {props.trainee.city}</div>
    </div>
  );
};

export default TraineeInfo;

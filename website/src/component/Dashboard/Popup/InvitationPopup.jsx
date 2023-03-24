const InvitationPopup = (props) => {
  return (
    <div className="popup-container">
      <div>INFO</div>
      <div>{"Info text"}</div>
      {!props.mine && (
        <div>
          <button className="button">Accept</button>
          <button className="button">Deny</button>
        </div>
      )}
    </div>
  );
};

export default InvitationPopup;

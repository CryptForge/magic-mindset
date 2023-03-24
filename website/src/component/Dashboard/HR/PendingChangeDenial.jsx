const PendingChangeDenial = () => {
  return (
    <div className="popup-container">
      <div className="float-right small-text">
        Click somewhere else to close
      </div>
      <div>
        <div>
          <textarea placeholder="Reason for denial"></textarea>
        </div>
        <button className="button">Send denial</button>
      </div>
    </div>
  );
};

export default PendingChangeDenial;

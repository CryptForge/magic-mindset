const FileViewer = (props) => {
  return (
    <div className="popup-container">
      <div className="float-right small-text">
        Click somewhere else to close
      </div>
      <div>FILE VIEWER {props.fileId}</div>
    </div>
  );
};

export default FileViewer;

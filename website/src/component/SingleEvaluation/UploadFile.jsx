import Popup from "reactjs-popup";
import FileViewer from "../Dashboard/Popup/FileViewer";

const UploadFile = (props) => {
  return (
    <div className="grid-element element box3">
      <div className="min-width-0">
        <h2>Upload File</h2>
        <div>UPLOAD FILE INPUT AND THE LIKE</div>
        <Popup
          modal
          trigger={<button className="button">View Saved File</button>}
        >
          <FileViewer evaluationId={props.evaluationId} />
        </Popup>
      </div>
    </div>
  );
};

export default UploadFile;

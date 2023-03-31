import Popup from "reactjs-popup";
import { useAuthContext } from "../../AuthContext";
import { API_BASE } from "../../main";
import { authPostFormMutliForm } from "../../util";
import FileViewer from "../Dashboard/Popup/FileViewer";
import Protected from "../Protected";

const UploadFile = (props) => {
  const auth = useAuthContext();

  return (
    <div className="grid-element element box3">
      <div className="min-width-0">
        <Protected role="COACH|MANAGER">
          <h2>Upload File</h2>
          <div>
            <form
              onSubmit={async (event) => {
                await authPostFormMutliForm(
                  props.evaluationId,
                  event,
                  `${API_BASE}/evaluation/edit/conclusion`,
                  auth.getUser().token
                );
                props.refreshEvaluation(true);
              }}
            >
              <div>
                <label htmlFor="file" className="text">
                  Conclusion File
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept="application/pdf"
                ></input>
              </div>
              <div>
                <input type="submit" value="Save File" className="button" />
              </div>
            </form>
          </div>
        </Protected>
        <Protected role="TRAINEE">
          <h2>View File</h2>
        </Protected>
        {props.fileName !== null && (
          <Popup
            modal
            trigger={
              <button className="button margin-top">View Saved File</button>
            }
          >
            <FileViewer evaluationId={props.evaluationId} />
          </Popup>
        )}
      </div>
    </div>
  );
};

export default UploadFile;

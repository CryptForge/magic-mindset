import Popup from "reactjs-popup";
import FileViewer from "./FileViewer";

const EvaluationViewer = () => {
  return (
    <div className="popup-container">
      <div className="float-right small-text">
        Click somewhere else to close
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <td className="large-text padding-th">Conclusion:</td>
              <td>
                <Popup
                  nested
                  modal
                  trigger={
                    <td>
                      <div className="flex center">
                        <button className="button">View</button>
                      </div>
                    </td>
                  }
                >
                  <FileViewer fileId={0} />
                </Popup>
              </td>
            </tr>
            <tr>
              <td className="large-text">Location:</td>
              <td>{"PLACE"}</td>
            </tr>
            <tr>
              <td className="large-text">Date:</td>
              <td>{new Date().toLocaleDateString()}</td>
            </tr>
            <tr>
              <td className="large-text">Evaluator:</td>
              <td>{"NAME PERSON 1"}</td>
            </tr>
            <tr>
              <td className="large-text">Trainee:</td>
              <td>{"NAME PERSON 2"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EvaluationViewer;

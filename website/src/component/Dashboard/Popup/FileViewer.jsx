import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useAuthContext } from "../../../AuthContext";
import { API_BASE } from "../../../main";

const FileViewer = (props) => {
  const auth = useAuthContext();

  const docs = [
    {
      uri: `${API_BASE}/course/get/${
        props.courseId !== undefined
          ? `certification/` + props.courseId
          : `evaluation/` + props.evaluationId
      }`,
    },
  ];
  const headers = {
    Authorization: `Bearer ${auth.getUser().token}`,
  };
  return (
    <div className="popup-container">
      <div className="float-right small-text">
        Click somewhere else to close
      </div>
      <div>
        {docs.length > 0 ? (
          <DocViewer
            documents={docs}
            pluginRenderers={DocViewerRenderers}
            prefetchMethod="GET"
            requestHeaders={headers}
            config={{
              pdfZoom: {
                defaultZoom: 20,
                zoomJump: 0.2,
              },
            }}
          />
        ) : (
          <div>No file</div>
        )}
      </div>
    </div>
  );
};

export default FileViewer;

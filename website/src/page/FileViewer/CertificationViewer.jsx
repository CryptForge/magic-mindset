import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import "./FileViewer.css";
import AuthContext from "../../AuthContext";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const CertificationViewer = () => {
  const { courseId } = useParams();

  const auth = useContext(AuthContext);

  let token = "";

  if (auth.userIsAuthenticated()) {
    token = auth.getUser().token;
  }

  const docs = [
    { uri: `http://localhost:8080/api/course/get/certification/${courseId}` },
  ];

  return (
    <DocViewer
      documents={docs}
      initialActiveDocument={docs[0]}
      requestHeaders={{
        Authorization: `Bearer ${token}`,
      }}
      prefetchMethod="GET"
      pluginRenderers={DocViewerRenderers}
    />
  );
};

export default CertificationViewer;
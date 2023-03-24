import React, { useContext } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import AuthContext from "../../AuthContext";
import Protected from "../../component/Protected";

const Info = () => {
  return (
    <div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        tempore nulla quis mollitia magni illum ea, hic porro dolores
        repellendus, molestiae doloremque neque itaque illo deserunt, unde alias
        ducimus. Odio cumque eos nihil repudiandae dolore! Repellat ab eligendi
        in, facere officia totam ea maxime accusantium voluptatibus? Similique
        mollitia consequatur natus. Corporis ut voluptas sed impedit quo fugit
        placeat odit perspiciatis hic, corrupti dolorum accusamus nostrum libero
        quis iste velit incidunt natus, distinctio expedita error veniam vitae
        sit eum! In maxime ad, quos enim tenetur nesciunt omnis ipsam quibusdam
        dignissimos suscipit consequuntur temporibus rerum eos similique saepe
        pariatur quas, amet quia.
      </div>
      <button className="bluebutton">Click here!</button>
    </div>
  );
};

export default Info;

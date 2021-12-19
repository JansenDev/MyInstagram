import "./PreviewPublication.scss";

import React, { useState } from "react";

import { Image } from "semantic-ui-react";

import ModalPublication from "../../Modal/ModalPublication/ModalPublication";

function PreviewPublication(props) {
  const { publication } = props;
  const [show, setShow] = useState(false);

  return (
    <div className="preview-publication" onClick={() => setShow(true)}>
      <Image className="preview-publication__image" src={publication.file} />

      <ModalPublication
        show={show}
        setShow={setShow}
        publication={ publication }
      />
    </div>
  );
}

export default PreviewPublication;

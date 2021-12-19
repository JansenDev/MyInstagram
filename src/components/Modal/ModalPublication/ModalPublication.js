import "./ModalPublication.scss";
import React from "react";

import { Modal, Grid, Image } from "semantic-ui-react";

import CommentFrm from "./CommentFrm/CommentFrm";
import Comments from "./Comments";
import Action from "./Action/Action";

function ModalPublication(props) {
  const { show, setShow, publication } = props;

  const onClose = () => setShow(false);
  return (
    <Modal open={show} onClose={onClose} className="modal-publication">
      <Grid>
        <Grid.Column width={10} className="modal-publication__left">
          <Image
            className="modal-publication__left-image"
            src={publication.file}
          />
        </Grid.Column>
        <Grid.Column width={6} className="modal-publication__right">
          <Comments publicationId={publication.id} />
          <Action publicationId={publication.id} />
          <CommentFrm publicationId={publication.id} />
        </Grid.Column>
      </Grid>
    </Modal>
  );
}

export default ModalPublication;

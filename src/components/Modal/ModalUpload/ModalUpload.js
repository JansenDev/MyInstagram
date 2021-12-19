import "./ModalUpload.scss";

import React, { useCallback, useState } from "react";

import { POST } from "../../../gql/post";
import { useMutation } from "@apollo/client";

import { Modal, Icon, Button, Dimmer, Loader } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

function ModalUpload(props) {
  const { show, setShow } = props;
  const [fileUpload, setFileUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [post] = useMutation(POST);

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFileUpload({
      type: "image",
      file,
      preview: URL.createObjectURL(file),
    });
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const onClose = () => {
    setIsLoading(false);
    setFileUpload(null);
    setShow(false);
  };

  const onPost = async () => {
    // *Show loading
    setIsLoading(true);

    try {
      const result = await post({
        variables: {
          file: fileUpload.file,
        },
      });

      const {data} = result;

      if (!data.post.status) {
        toast.warning("Error en la publicación")
        isLoading(false);
      } else {
        // *Hide loading & clean FileUpload state & close Modal
        onClose();
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal size="small" open={show} onClose={onClose} className="modal-upload">
      <div
        {...getRootProps()}
        className="dropzone"
        style={fileUpload && { border: 0 }}
      >
        {!fileUpload && (
          <>
            <Icon name="cloud upload" />
            <p> Arrastra tu foto que quieras publicar </p>
          </>
        )}
        <input {...getInputProps()} />
      </div>

      {fileUpload?.type == "image" && (
        <div
          className="image"
          style={{ backgroundImage: `url("${fileUpload.preview}")` }}
        ></div>
      )}
      {fileUpload && (
        <Button onClick={onPost} className="btn-post">
          Publicar
        </Button>
      )}

      {isLoading && (
        <Dimmer active className="posting">
          <Loader />
          <p>Publicando...</p>
        </Dimmer>
      )}
    </Modal>
  );
}

export default ModalUpload;

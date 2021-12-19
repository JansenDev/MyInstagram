import React, { useCallback, useState } from "react";
import "./AvatarForm.scss";
import { Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { UPDATE_AVATAR, GET_USER, DELETE_AVATAR } from "../../../gql/user";
import { toast } from "react-toastify";

export default function AvatarForm(props) {
  const { setShowModal, auth } = props;

  //*Usar Mutation graphql
  const [updateAvatar] = useMutation(UPDATE_AVATAR, {
    //*Actualizar el cache de graphql para que se actualice el avatar
    update(cache, { data: { updateAvatar } }) {
      //*Obtener los datos de la caché
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { username: auth.username },
      });
      //*Actualizar la caché
      cache.writeQuery({
        query: GET_USER,
        variables: { username: auth.username },
        data: { getUser: { ...getUser, avatar: updateAvatar.urlAvatar } },
      });
    },
  });
  const [loading, setLoading] = useState(false);
  const onDrop = useCallback(async (acceptedFiles) => {

    const file = acceptedFiles[0];

    try {
      setLoading(true);
      //*Hacer consulta mutation
      const updateAvatarResponse = await updateAvatar({
        variables: {
          file,
        },
      });

      if (!updateAvatarResponse.data.updateAvatar.status) {
        toast.warning("Error al cargar el avatar");
        setLoading(false);
      } else {
        setShowModal(false);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [deleteAvatar] = useMutation(DELETE_AVATAR, {
    update(cache) {
      //*Obtener los datos de la caché
      const { getUser } = cache.readQuery({
        query: GET_USER, //*gql que queremos leer
        variables: {
          username: auth.username,
        },
      });
      //*Actualizar la caché
      cache.writeQuery({
        query: GET_USER, //*gql que queremos leer para sobreescribir
        variables: { variables: auth.username },
        data: {
          getUser: { ...getUser, avatar: "" },
        },
      });
    },
  });

  const onDeleteAvatar = async () => {
    try {
      const { data } = await deleteAvatar();
      if (!data.deleteAvatar) {
        toast.warning("Error al eliminar el Avatar");
      } else {
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
  });

  return (
    <div className="avatar-form">
      <Button {...getRootProps()} loading={loading}>
        Cargar foto
      </Button>
      <Button onClick={() => onDeleteAvatar()}>Eliminar foto actual</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
      <input {...getInputProps()} />
    </div>
  );
}

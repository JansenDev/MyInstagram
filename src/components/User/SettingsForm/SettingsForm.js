import React from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import "./SettingsForm.scss";
import PasswordForm from "../PasswordForm";
import useAuth from "../../../hooks/useAuth";

function SettingsForms(props) {
  const { setShowModal, setTitleModal, setChildrenModal } = props;
  const { logout } = useAuth();

  const history = useHistory();
  const aClient = useApolloClient();

  const onlogout = () => {
    aClient.clearStore();
    logout();
    history.push("/");
  };
  const changePassword = () => {
    setTitleModal("Change Password");
    setChildrenModal(
      <PasswordForm onlogout={onlogout} setShowModal={setShowModal} />
    );
  };
  return (
    <div className="settings-form">
      <Button onClick={() => changePassword()}>Cambiar Contraseña</Button>
      <Button>Cambiar email</Button>
      <Button>Descripcion</Button>
      <Button>Sitio Web</Button>
      <Button onClick={() => onlogout()}>Cerrar Sesion</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
}
 
export default SettingsForms;

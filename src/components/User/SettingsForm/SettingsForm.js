import React from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import "./SettingsForm.scss";
import PasswordForm from "../PasswordForm";
import useAuth from "../../../hooks/useAuth";
import EmailForm from "../EmailForm";

function SettingsForms(props) {
  const { setShowModal, setTitleModal, setChildrenModal, getUser } = props;
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

  const changeEmail = () => {
    setTitleModal("Change Email");
    setChildrenModal(
      <EmailForm setShowModal={setShowModal} onlogout={onlogout}  getUser={getUser}/>
    );
  };
  return (
    <div className="settings-form">
      <Button onClick={changePassword}>Cambiar Contraseña</Button>
      <Button onClick={changeEmail}>Cambiar email</Button>
      <Button>Descripcion</Button>
      <Button>Sitio Web</Button>
      <Button onClick={onlogout}>Cerrar Sesion</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
}

export default SettingsForms;

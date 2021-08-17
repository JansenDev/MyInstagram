import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./PasswordForm.scss";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import { toast } from "react-toastify";

function PasswordForm(props) {
  const {onlogout, setShowModal} = props;
  const [ updateUser ] = useMutation(UPDATE_USER);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      oldPassword: Yup.string().required(),
      newPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("repeatPassword")]),
      repeatPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("newPassword")]),
    }),
    onSubmit: async (formValues) => {
      try {
        console.log(formValues);
        const isPasswordChanged = await updateUser({
          variables: {
            input: {
              oldPassword: formValues.oldPassword,
              newPassword: formValues.newPassword,
            },
          },
        });

        if(!isPasswordChanged.data.updateUser){
          toast.error("Error to the change password");
        }else{
          // onlogout();
          setShowModal(false);
          toast.success("Password Changed");
        }
      } catch (err) {
        toast.error("Error to the change password");
      }
    },
  });
  return (
    <Form className="password-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder="Contraseña Actual"
        name="oldPassword"
        type="password"
        value={formik.values.oldPassword}
        onChange={formik.handleChange}
        error={formik.errors.oldPassword && true}
      />
      <Form.Input
        placeholder="Nueva Contraseña"
        name="newPassword"
        type="password"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        error={formik.errors.newPassword && true}
      />
      <Form.Input
        placeholder="Repetir Nueva Contraseña"
        name="repeatPassword"
        type="password"
        value={formik.values.repeatPassword}
        onChange={formik.handleChange}
        error={formik.errors.repeatPassword && true}
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
}

function initialValues() {
  return {
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  };
}

export default PasswordForm;

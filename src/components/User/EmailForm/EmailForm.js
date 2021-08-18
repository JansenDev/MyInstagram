import React from "react";
import { Form, Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { UPDATE_USER, GET_USER } from "../../../gql/user";
import { toast } from "react-toastify";

function EmailForm(props) {
  const { onlogout, setShowModal, getUser } = props;
  const username = getUser.username
  const [updateUser] = useMutation(UPDATE_USER, {

    update(cacheMemory, updateUserResult) {
      // console.log(cacheMemory);
      // console.log(updateUserResult);
      // const { getUser } = cacheMemory.readQuery({
      //   query: GET_USER,
      //   variables: {
      //     username: username,
      //   },
      // });

      //! Actualiza la caché
      //! NOTA: No es necesario consultar la query cache para actualizar la misma
      cacheMemory.writeQuery({
        query: GET_USER,
        variables: {
          username: username,
        },
        data: {
          getUser: {
            ...getUser,
            email: updateUserResult.data.updateUser.email,
          },
        },
      });
      
    },
  });
  const formik = useFormik({
    initialValues: { email: getUser.email },
    validationSchema: Yup.object({
      email: Yup.string().email().max(255).required(),
    }),
    onSubmit: async (valuesForm) => {
      try {
        const isEmailChanged = await updateUser({
          variables: {
            input: { email: valuesForm.email },
          },
        });

        if (!isEmailChanged.data.updateUser.status) {
          toast.error("Error to the change email");
        } else {
          setShowModal(false);
          toast.success("Email changed successfull.");
        }
      } catch (error) {
        toast.error("Error to the change email");
      }
    },
  });

  return (
    <Form className="email-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        type="text"
        placeholder="Insert new Email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email && true}
      />

      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
}

export default EmailForm;

import React from "react";
import "./WebSiteForm.scss";
import { Form, Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { GET_USER, UPDATE_USER } from "../../../gql/user";
import { toast } from "react-toastify";

function WebSiteForm(props) {
  const { setShowModal, getUser } = props;
  const [updateUser] = useMutation(UPDATE_USER, {
    update(cachememory, updateUserResult) {
      cachememory.writeQuery({
        query: GET_USER,
        variables: {
          username: getUser.username,
        },
        data: {
          getUser: {
            ...getUser,
            siteweb: updateUserResult.data.updateUser.siteweb,
          },
        },
      });
    },
  });
  const formik = useFormik({
    initialValues: { siteweb: getUser.siteweb },
    validationSchema: Yup.object({
      siteweb: Yup.string().max(80),
    }),
    onSubmit: async (formValues) => {
      try {
        const iswebSiteChanged = await updateUser({
          variables: {
            input: {
              siteweb: formValues.siteweb,
            },
          },
        });
        if (!iswebSiteChanged.data.updateUser.siteweb) {
          toast.error("Error changing web siteweb");
          throw new Error("Error changing siteweb");
        } else {
          toast.success("web site Changed");
          setShowModal(false);
        }
      } catch (error) {
        toast.error("Error changing web site");
      }
    },
  });
  return (
    <Form className="webSite-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder="My web site"
        value={formik.values.siteweb}
        name="siteweb"
        onChange={formik.handleChange}
        error={formik.errors.siteweb && true}
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
}

export default WebSiteForm;

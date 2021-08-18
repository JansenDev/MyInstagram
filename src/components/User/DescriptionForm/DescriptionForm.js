import React from "react";
import { Form, Button } from "semantic-ui-react";
import "./DescriptionForm.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { GET_USER, UPDATE_USER } from "../../../gql/user";
import { toast } from "react-toastify";

function DescriptionForm(props) {
  const { getUser, setShowModal } = props;
  const [updateUser] = useMutation(UPDATE_USER, {
    update(cacheMemory, updateUserResult) {
      cacheMemory.writeQuery({
        query: GET_USER,
        variables: {
          username: getUser.username,
        },
        data: {
          getUser: {
            ...getUser,
            description: updateUserResult.data.updateUser.description,
          },
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      description: getUser.description,
    },
    validationSchema: Yup.object({
      description: Yup.string().max(500),
    }),
    onSubmit: async (formValues) => {
      try {
        const isDescriptionChanged = await updateUser({
          variables: {
            input: {
              description: formValues.description,
            },
          },
        });

        if (!isDescriptionChanged.data.updateUser.status) {
          toast.error("error changing description");
          throw new Error("error changing description");
        } else {
          toast.success("Description Changed");
          setShowModal(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error changing description");
      }
    },
  });
  return (
    <Form className="description-form" onSubmit={formik.handleSubmit}>
      <Form.TextArea
        value={formik.values.description}
        name="description"
        onChange={formik.handleChange}
        error={formik.errors.description}
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
}

export default DescriptionForm;

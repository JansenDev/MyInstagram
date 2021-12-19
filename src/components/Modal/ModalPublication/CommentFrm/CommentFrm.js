import "./CommentFrm.scss";

import React from "react";

import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation } from "@apollo/client";
import { ADDCOMMENT } from "../../../../gql/comment";

function CommentFrm(props) {
  const { publicationId } = props;

  const [addComment] = useMutation(ADDCOMMENT);
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      const { comment } = formData;
      try {
        const result = await addComment({
          variables: {
            input: {
              idPost: publicationId,
              comment: comment,
            },
          },
        });
        formik.handleReset();
      } catch (error) {}
    },
  });

  return (
    <Form className="comment-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder="Comentar"
        name="comment"
        value={formik.values.comment}
        onChange={formik.handleChange}
        error={formik.errors.comment && true}
      />
      <Button type="submit">Publicar</Button>
    </Form>
  );
}

export default CommentFrm;

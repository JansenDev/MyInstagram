import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import { Link } from "react-router-dom";
import { Icon, Image } from "semantic-ui-react";
import useAuth from "../../../hooks/useAuth";
import ImageNoFound from "../../../assets/avatar.png";
import "./RightHeader.scss";
import ModalUpload from "../../Modal/ModalUpload/ModalUpload";

export default function RightHeader() {
  const { auth } = useAuth();

  const [show, setShow] = useState(false);

  const result = useQuery(GET_USER, {
    variables: { username: auth.username },
  });

  const { data, loading, error } = result;
  if (loading || error) return null;
  const { getUser } = data;

  const openModal = () => {
    setShow(!show)
  }

  return (
    <>
      <div className="right-header">
        <Link to="/">
          <Icon name="home" />
        </Link>
        <Link to="#" onClick={openModal}>
          <Icon name="plus" />
        </Link>
        <Link to={`/${auth.username}`}>
          <Image src={getUser.avatar ? getUser.avatar : ImageNoFound} avatar />
        </Link>
      </div>
      <div>
        <ModalUpload show={show} setShow={setShow} />
      </div>
    </>
  );
}

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import { Link } from "react-router-dom";
import { Icon, Image } from "semantic-ui-react";
import useAuth from "../../../hooks/useAuth";
import ImageNoFound from "../../../assets/avatar.png";
import "./RightHeader.scss";

export default function RightHeader() {
  const { auth } = useAuth();

  const result = useQuery(GET_USER, {
    variables: { username: auth.username },
  });

  const { data, loading, error } = result;
  if (loading || error) return null;
  const { getUser } = data;

  return (
    <div className="right-header">
      <Link to="/">
        <Icon name="home" />
      </Link>

      <Link to="/">
        <Icon name="plus" />
      </Link>

      <Link to={`/${auth.username}`}>
        <Image src={getUser.avatar ? getUser.avatar : ImageNoFound} avatar />
      </Link>
    </div>
  );
}

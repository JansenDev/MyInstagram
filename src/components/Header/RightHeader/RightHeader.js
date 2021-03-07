import React from "react";
import "./RightHeader.scss";
import { Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import ImageNoFound from "../../../assets/avatar.png";

export default function RightHeader() {
    const { auth } = useAuth();
  return (
    <div className="right-header">
      <Link to="/">
        <Icon name="home" />
      </Link>

      <Link to="/">
        <Icon name="plus" />
      </Link>

      <Link to={`/${auth.username}`} >
        <Image src={ImageNoFound} avatar />
      </Link>
    </div>
  );
}

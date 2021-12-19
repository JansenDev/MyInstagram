import "./NotFolloweds.scss";

import React from "react";

import { Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_NOT_FOLLOWEDS } from "../../../gql/follow";
import { map } from "lodash";

import ImageNotFound from "../../../assets/avatar.png";

function NotFolloweds() {
  const { data, loading } = useQuery(GET_NOT_FOLLOWEDS);

  if (loading) return null;
  console.log(data);
  const { getNotFolloweds: NotFollowedsList } = data;
  return (
    <div className="users-not-followeds">
      <h3>Usuarios que no sigues </h3>
      {map(NotFollowedsList, (NotFollow, index) => (
        <Link
          key={index}
          to={`/${NotFollow.username}`}
          className="users-not-followeds__user"
        >
          <div className="">
            <Image src={NotFollow.avatar || ImageNotFound} avatar />
            <span>{NotFollow.username}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default NotFolloweds;

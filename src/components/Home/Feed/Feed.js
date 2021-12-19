import "./Feed.scss";

import React, { useState } from "react";

import { map } from "lodash";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POST_OF_FOLLOWEDS } from "../../../gql/post";

import ImageNotFound from "../../../assets/avatar.png";
import Action from "../../Modal/ModalPublication/Action";
import CommentFrm from "../../Modal/ModalPublication/CommentFrm";
import ModalPublication from "../../Modal/ModalPublication";

function Feed() {
  const { data, loading } = useQuery(GET_POST_OF_FOLLOWEDS);
  const [show, setShow] = useState(false);
  const [publication, setPublication] = useState(null);

  if (loading) return null;
  const { getPostsFolloweds: postsFollowedsList } = data;
  const onPublication = (post) => {
    setPublication(post);
    setShow(true);
  };
  return (
    <>
      <div className="feed">
        {map(postsFollowedsList, (post, index) => (
          <div key={index} className="feed__box">
            <Link key={index} to={`/${post.idUser.username}`}>
              <div className="feed__box-user">
                <Image
                  key={index}
                  src={post.idUser.avatar || ImageNotFound}
                  avatar
                />
                <span> {post.idUser.name}</span>
              </div>
            </Link>
            <div
              className="feed__box-photo"
              style={{ backgroundImage: `url("${post.file}")` }}
              onClick={()=>onPublication(post)}
            ></div>
            <div className="feed__box-action">
              <Action publicationId={post.id} style="position:relative" />
            </div>
            <div className="feed__box-commentFrm">
              <CommentFrm publicationId={post.id} />
            </div>
          </div>
        ))}
      </div>
      {publication && (
        <ModalPublication
          show={show}
          setShow={setShow}
          publication={publication}
        />
      )}
    </>
  );
}
export default Feed;
